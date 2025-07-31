import {
	Dialog,
	DialogTitle,
	DialogContent,
	CircularProgress,
	Box,
	Typography,
} from '@mui/material';
import EditAccountForm, {
	EditAccountFormProps,
} from '../../forms/account-form/edit-account-form.component';
import { CreateAccountDto } from '../../auth.api';

interface Props {
	open: boolean;
	onClose: () => void;
	loading: boolean;
	error: string | null;
	defaultValues: CreateAccountDto | null;
	onSubmit: (data: CreateAccountDto) => Promise<void>;
}

const EditAccountDialog = ({
	open,
	onClose,
	loading,
	error,
	defaultValues,
	onSubmit,
}: Props) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Edit Account</DialogTitle>
			<DialogContent dividers>
				{defaultValues ? (
					<>
						<EditAccountForm
							defaultValues={defaultValues}
							onSubmit={onSubmit}
							disabled={loading}
						/>

						{error && (
							<Typography color="error" variant="body2" gutterBottom>
								{error}
							</Typography>
						)}
					</>
				) : (
					<Box display="flex" justifyContent="center" my={4}>
						<CircularProgress />
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default EditAccountDialog;
