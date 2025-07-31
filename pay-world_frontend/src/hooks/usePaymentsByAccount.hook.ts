import { useEffect, useState } from 'react';
import { getPaymentsByAccount, Payment } from '../auth.api';

export const usePaymentsByAccount = (
  accountId?: number | null,
  enabled = true,
) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    if (!enabled || !accountId) {
      setPayments([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getPaymentsByAccount(accountId);
      setPayments(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [accountId, enabled]);

  return { payments, loading, error, refetch: fetchPayments };
};
