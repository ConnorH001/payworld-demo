import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { usePaymentsByAccount } from '../../hooks/usePaymentsByAccount.hook';
import { usePaymentApproval } from '../../hooks/usePaymentApproval.hook';
import { useAddPayment } from '../../hooks/useAddPayment.hook';
import { useState } from 'react';
import AddPaymentDialog from './add-payment-dialog.component';

interface Props {
	accountId: number | null;
	open: boolean;
	onClose: () => void;
	paymentsHook: ReturnType<typeof usePaymentsByAccount>;
	approvalHook: ReturnType<typeof usePaymentApproval>;
}

const ViewPaymentsDialog = ({
	accountId,
	open,
	onClose,
	paymentsHook,
	approvalHook,
}: Props) => {
	const { payments, refetch } = paymentsHook;
	const { approve } = approvalHook;

	const { addPayment, loading: adding, error: addError } = useAddPayment();
	const [addOpen, setAddOpen] = useState(false);

	const openAdd = () => setAddOpen(true);
	const closeAdd = () => setAddOpen(false);
	const handleAdd = async (data: any) => {
		if (!accountId) return;
		await addPayment(accountId, data);
		await refetch();
		closeAdd();
	};

	return (
		<>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
				<DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
					Payments for #{accountId}
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent dividers>
					<List>
						{payments.length === 0 ? (
							<ListItem>
								<ListItemText primary="No payments found." />
							</ListItem>
						) : (
							payments.map((payment) => (
								<ListItem key={payment.id} divider>
									<ListItemText
										primary={`Recipient: ${payment.recipientName}`}
										secondary={
											<>
												<div>Amount: {payment.amount}</div>
												<div>Bank: {payment.recipientBankName}</div>
												<div>Account No: {payment.recipientAccountNumber}</div>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														gap: 8,
													}}
												>
													Status:{' '}
													<strong
														style={{
															color:
																payment.status === 'approved'
																	? 'green'
																	: 'orange',
														}}
													>
														{payment.status}
													</strong>
													{payment.status !== 'approved' && (
														<Button
															size="small"
															variant="outlined"
															onClick={async () => {
																await approve(payment.id, 'approved');
																await refetch();
															}}
														>
															Approve?
														</Button>
													)}
												</div>
											</>
										}
									/>
								</ListItem>
							))
						)}
					</List>
				</DialogContent>

				<DialogActions>
					<Button onClick={openAdd} variant="contained">
						Add Payment
					</Button>
				</DialogActions>
			</Dialog>
			<AddPaymentDialog
				open={addOpen}
				onClose={closeAdd}
				onAdd={handleAdd}
				loading={adding}
				error={addError}
			/>
		</>
	);
};

export default ViewPaymentsDialog;
