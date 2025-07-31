import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	FormControl,
	FormControlLabel,
	Checkbox,
	Link,
	Stack,
} from '@mui/material';
import { useState } from 'react';
import { handleEnter } from './utils/auth.util';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({
	type,
	onSwitch,
	setIsLoggedIn,
}: {
	type: 'Login' | 'Register';
	onSwitch: () => void;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleEnter(
			type,
			{ email, password },
			() => {
				setError(null);
				setIsLoggedIn(true);
				navigate('/');
			},
			(message) => {
				setError(message);
			},
		);
	};

	return (
		<Box
			sx={{
				height: '100vh',
				bgcolor: 'background.default',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				p: 2,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					p: 4,
					width: 320,
					bgcolor: 'background.paper',
					borderRadius: 2,
				}}
			>
				<Typography variant="h5" component="h1" align="center" gutterBottom>
					{type}
				</Typography>

				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
				>
					<FormControl fullWidth>
						<TextField
							label="Company Email"
							variant="outlined"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							sx={{ input: { color: 'text.primary' } }}
						/>
					</FormControl>

					<FormControl fullWidth>
						<TextField
							label="Password"
							variant="outlined"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							sx={{ input: { color: 'text.primary' } }}
						/>
					</FormControl>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ mt: 1, py: 1.5 }}
						fullWidth
					>
						{type === 'Login' ? 'Sign In' : 'Create Account'}
					</Button>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<Stack spacing={2} mt={2}>
						{type === 'Login' ? (
							<>
								<Stack
									direction="row"
									spacing={1}
									justifyContent="center"
									alignItems="center"
								>
									<Typography variant="body2">
										Don’t have an account?
									</Typography>
									<Link component="button" onClick={onSwitch}>
										Sign up
									</Link>
								</Stack>
							</>
						) : (
							<Stack
								direction="row"
								spacing={1}
								justifyContent="center"
								alignItems="center"
							>
								<Typography variant="body2">
									Already have an account?
								</Typography>
								<Link onClick={onSwitch} component="button">
									Sign in
								</Link>
							</Stack>
						)}
					</Stack>
				</Box>
			</Paper>
		</Box>
	);
};

export default AuthForm;
