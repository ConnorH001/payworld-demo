import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { CreatePaymentDto } from '../../auth.api';

interface Props {
	defaultValues?: CreatePaymentDto;
	onSubmit: (data: CreatePaymentDto) => void;
	disabled?: boolean;
	error?: string | null;
}

const fields: Array<keyof CreatePaymentDto> = [
	'recipientName',
	'recipientBankName',
	'recipientAccountNumber',
	'amount',
];

const toLabel = (key: string) =>
	key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

const AddPaymentForm = ({
	defaultValues,
	onSubmit,
	disabled = false,
	error,
}: Props) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreatePaymentDto>({
		defaultValues: defaultValues || {
			recipientName: '',
			recipientBankName: '',
			recipientAccountNumber: '',
			amount: '',
		},
	});

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)}>
			{error && (
				<Typography color="error" variant="body2" gutterBottom>
					{error}
				</Typography>
			)}

			{fields.map((field) => (
				<Controller
					key={field}
					name={field}
					control={control}
					rules={{ required: `${toLabel(field)} is required` }}
					render={({ field: f }) => (
						<TextField
							{...f}
							label={toLabel(field)}
							fullWidth
							margin="normal"
							error={!!errors[field]}
							helperText={errors[field]?.message}
							disabled={disabled}
						/>
					)}
				/>
			))}

			<Box mt={2}>
				<Button type="submit" variant="contained" fullWidth disabled={disabled}>
					Add Payment
				</Button>
			</Box>
		</Box>
	);
};

export default AddPaymentForm;
