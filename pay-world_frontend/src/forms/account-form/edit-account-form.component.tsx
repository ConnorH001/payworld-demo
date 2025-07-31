import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { CreateAccountDto } from '../../auth.api';

export type EditAccountFormProps = {
	defaultValues: CreateAccountDto;
	onSubmit: (data: CreateAccountDto) => void;
	disabled?: boolean;
};

const EditAccountForm = ({
	defaultValues,
	onSubmit,
	disabled = false,
}: EditAccountFormProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateAccountDto>({
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="name"
				control={control}
				rules={{ required: 'name is required' }}
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
				rules={{ required: 'address is required' }}
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
				rules={{ required: 'phone is required' }}
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
				rules={{ required: 'bank number is required' }}
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

			<Box mt={2}>
				<Button type="submit" variant="contained" fullWidth disabled={disabled}>
					Save Changes
				</Button>
			</Box>
		</form>
	);
};

export default EditAccountForm;
