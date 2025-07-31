import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { CreateAccountDto } from '../../auth.api';

export type AccountFormData = CreateAccountDto;

interface Props {
	onSubmit: (data: AccountFormData) => void;
	disabled?: boolean;
}

const AddAccountForm = ({ onSubmit, disabled }: Props) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateAccountDto>({
		defaultValues: {
			name: '',
			address: '',
			phone: '',
			bankNumber: '',
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="name"
				control={control}
				rules={{ required: 'Name is required' }}
				render={({ field }) => (
					<TextField
						{...field}
						label="Name"
						error={!!errors.name}
						helperText={errors.name?.message}
						fullWidth
						margin="normal"
						disabled={disabled}
					/>
				)}
			/>

			<Controller
				name="address"
				control={control}
				rules={{ required: 'Address is required' }}
				render={({ field }) => (
					<TextField
						{...field}
						label="Address"
						error={!!errors.address}
						helperText={errors.address?.message}
						fullWidth
						margin="normal"
						disabled={disabled}
					/>
				)}
			/>

			<Controller
				name="phone"
				control={control}
				rules={{ required: 'Phone is required' }}
				render={({ field }) => (
					<TextField
						{...field}
						label="Phone"
						error={!!errors.phone}
						helperText={errors.phone?.message}
						fullWidth
						margin="normal"
						disabled={disabled}
					/>
				)}
			/>

			<Controller
				name="bankNumber"
				control={control}
				rules={{ required: 'Bank number is required' }}
				render={({ field }) => (
					<TextField
						{...field}
						label="Bank Number"
						error={!!errors.bankNumber}
						helperText={errors.bankNumber?.message}
						fullWidth
						margin="normal"
						disabled={disabled}
					/>
				)}
			/>

			<Button type="submit" variant="contained" fullWidth disabled={disabled}>
				Create Account
			</Button>
		</form>
	);
};

export default AddAccountForm;
