import { useState } from 'react';
import Api, { CreatePaymentDto, Payment } from '../auth.api';

export const useAddPayment = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const addPayment = async (
		accountId: number,
		payload: CreatePaymentDto,
	): Promise<Payment> => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await Api.post<Payment, CreatePaymentDto>({
				url: `/payments/account/${accountId}`,
				data: payload,
			});
			return data;
		} catch (err: any) {
			setError(err.response?.data?.message || err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { addPayment, loading, error };
};
