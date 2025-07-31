import {
	Paper,
	Stack,
	Typography,
	Link,
	Button,
	Divider,
	Box,
} from '@mui/material';

interface Props {
	accounts: { id: number; name: string }[];
	onSelect: (id: number) => void;
	onEdit?: (id: number) => void;
}

const AccountList = ({ accounts, onSelect, onEdit }: Props) => {
	return (
		<Stack spacing={3}>
			{accounts.map((account) => (
				<Paper key={account.id} elevation={3} sx={{ p: 3 }}>
					<Typography
						variant="h6"
						sx={{
							width: '100%',
							textAlign: 'center',
						}}
					>
						{account.name?.toUpperCase()}
					</Typography>

					<Stack
						direction="row"
						spacing={4}
						justifyContent="center"
						alignItems="center"
						sx={{ mt: 2 }}
						divider={
							<Divider
								orientation="vertical"
								flexItem
								sx={{ bgcolor: 'grey.600' }}
							/>
						}
					>
						<Button
							onClick={() => onSelect(account.id)}
							sx={{
								fontWeight: 600,
							}}
						>
							See all payments
						</Button>

						<Button
							size="small"
							onClick={() => onEdit?.(account.id)}
							sx={{ fontWeight: 600 }}
						>
							Edit
						</Button>
					</Stack>
				</Paper>
			))}
		</Stack>
	);
};

export default AccountList;
