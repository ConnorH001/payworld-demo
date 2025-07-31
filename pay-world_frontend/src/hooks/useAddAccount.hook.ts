import { useState } from 'react';
import { CreateAccountDto, createAccount } from '../auth.api';

export const useAddAccount = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	const addAccount = async (data: CreateAccountDto) => {
		setLoading(true);
		try {
			await createAccount(data);
		} finally {
			setLoading(false);
		}
	};

	return {
		open: isOpen,
		onOpen: open,
		onClose: close,
		addAccount,
		loading,
	};
};
