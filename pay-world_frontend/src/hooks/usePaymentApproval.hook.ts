import { useState } from 'react';
import Api from '../auth.api';

type PaymentStatus = 'pending' | 'approved';

export const usePaymentApproval = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const approve = async (paymentId: number, newStatus: PaymentStatus) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await Api.patch<{ id: number; status: string }, { status: string }>({
        url: `/payments/${paymentId}/status`,
        data: { status: newStatus },
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to update payment status');
    } finally {
      setLoading(false);
    }
  };

  return { approve, loading, error, success };
};
