import { useState, useEffect, useCallback } from 'react';
import Api from '../auth.api';

export interface Account {
	id: number;
	name: string;
	address: string;
	phone: string;
	bankNumber: string;
	organization: { id: string };
}

export const useAccounts = () => {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchAccounts = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const { data } = await Api.get<Account[]>('/accounts');
			setAccounts(data);
		} catch (err: any) {
			setError(err.message || 'Unknown error');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAccounts();
	}, [fetchAccounts]);
	//todo need to wire refetch properly for currentaccounts rather than refreshing browser tab, less than ideal
	return { accounts, loading, error, refetch: fetchAccounts };
};
