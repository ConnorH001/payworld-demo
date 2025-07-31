import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@mui/material';
import { CreatePaymentDto } from '../../auth.api';
import AddPaymentForm from '../../forms/payment-form/add-payment-form.component';

interface Props {
	open: boolean;
	onClose: () => void;
	onAdd: (data: CreatePaymentDto) => Promise<void>;
	loading: boolean;
	error: string | null;
}

const AddPaymentDialog = ({ open, onClose, onAdd, loading, error }: Props) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Add New Payment</DialogTitle>
			<DialogContent dividers>
				<AddPaymentForm onSubmit={onAdd} disabled={loading} error={error} />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddPaymentDialog;
