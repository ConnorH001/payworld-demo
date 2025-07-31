import { useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { useAccounts } from '../hooks/useAccounts.hook';
import { usePaymentsByAccount } from '../hooks/usePaymentsByAccount.hook';
import { usePaymentApproval } from '../hooks/usePaymentApproval.hook';
import { useAddAccount } from '../hooks/useAddAccount.hook';
import AccountList from '../components/account-list/account-list.component';
import ViewPaymentsDialog from '../components/dialogs/view-payments-dialog.component';
import AddAccountDialog from '../components/dialogs/add-account-dialog.component';
import { useEditAccount } from '../hooks/useEditAccount.hook';
import EditAccountDialog from '../components/dialogs/edit-account-dialog.component';

const HomePage = () => {
	const { accounts } = useAccounts();
	const [selected, setSelected] = useState<number | null>(null);
	const [editId, setEditId] = useState<number | null>(null);

	const paymentsHook = usePaymentsByAccount(selected, Boolean(selected));
	const approvalHook = usePaymentApproval();
	const addAccountHook = useAddAccount();
	const editHook = useEditAccount(editId);

	return (
		<Container maxWidth="sm" sx={{ mt: 4 }}>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={2}
			>
				<Typography sx={{ color: '#000000', fontWeight: 600 }} variant="h4">
					Current Accounts
				</Typography>
				<Button
					variant="contained"
					startIcon={<CreditCardIcon />}
					size="small"
					onClick={addAccountHook.onOpen}
				>
					Add Account
				</Button>
			</Box>

			<AccountList
				accounts={accounts}
				onSelect={(id) => setSelected(id)}
				onEdit={(id) => {
					setEditId(id);
					editHook.onOpen();
				}}
			/>

			<ViewPaymentsDialog
				accountId={selected}
				open={Boolean(selected)}
				onClose={() => setSelected(null)}
				paymentsHook={paymentsHook}
				approvalHook={approvalHook}
			/>

			<AddAccountDialog {...addAccountHook} />
			<EditAccountDialog
				open={editHook.isOpen}
				onClose={() => {
					editHook.onClose();
					setEditId(null);
				}}
				loading={editHook.loading}
				error={editHook.error}
				defaultValues={editHook.account}
				onSubmit={editHook.editAccount}
			/>
		</Container>
	);
};
export default HomePage;
