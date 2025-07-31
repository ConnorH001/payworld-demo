export class UpdatePaymentDto {
  status?: 'pending' | 'approved';
  amount?: string;
  recipientName?: string;
  recipientBankName?: string;
  recipientAccountNumber?: string;
}
