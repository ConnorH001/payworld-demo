import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@mui/material';
import AddAccountForm, {
	AccountFormData,
} from '../../forms/account-form/add-account-form.component';

interface Props {
	open: boolean;
	onClose: () => void;
	addAccount: (data: AccountFormData) => Promise<void>;
	loading: boolean;
}

const AddAccountDialog = ({ open, onClose, addAccount, loading }: Props) => {
	const handleSubmit = async (data: AccountFormData) => {
		await addAccount(data);
		//todo wireup refetch in parent component to refresh the list on submit
		window.location.reload();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add New Account</DialogTitle>
			<DialogContent>
				<AddAccountForm onSubmit={handleSubmit} disabled={loading} />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddAccountDialog;
