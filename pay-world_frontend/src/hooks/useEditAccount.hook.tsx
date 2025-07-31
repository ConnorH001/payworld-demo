import { useState, useEffect } from 'react';
import { CreateAccountDto, updateAccount, getAccountById } from '../auth.api';

export const useEditAccount = (accountId: number | null) => {
	const [isOpen, setIsOpen] = useState(false);
	const [account, setAccount] = useState<CreateAccountDto | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// refresh account data on change
	useEffect(() => {
		if (!isOpen || accountId === null) return;

		let cancelled = false;
		setLoading(true);
		getAccountById(accountId)
			.then((dto) => {
				if (!cancelled) setAccount(dto);
			})
			.catch((err: any) => {
				if (!cancelled) setError(err?.message ?? 'Unexpected error');
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [accountId, isOpen]);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	const editAccount = async (data: CreateAccountDto) => {
		if (accountId === null) return;
		setLoading(true);
		setError(null);
		try {
			await updateAccount(accountId, data);
			// todo refresh list here at some point
			close();
		} catch (err: any) {
			setError(err?.message ?? 'Failed to update account');
		} finally {
			setLoading(false);
		}
	};

	return {
		isOpen,
		onOpen: open,
		onClose: close,
		loading,
		error,
		account, // going to be defaultValues
		editAccount, // going to be onSubmit
	};
};
