import { AppBar, Box, Toolbar, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { handleExit } from '../../forms/auth-form/utils/auth.util';

interface HeaderProps {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isLoggedIn, setIsLoggedIn }: HeaderProps) => {
	const handleLogout = async () => {
		try {
			await handleExit();
			setIsLoggedIn(false);
		} catch (error) {
			console.error('logout failed', error);
		}
	};

	return (
		<AppBar position="static">
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<a href="/">
					<img
						src={process.env.PUBLIC_URL + '/payworld.png'}
						alt="Logo"
						width="80"
						height="80"
					/>
				</a>

				<Box>
					{isLoggedIn ? (
						<Link
							component="button"
							onClick={handleLogout}
							underline="hover"
							color="inherit"
							sx={{ ml: 2 }}
						>
							Log Out
						</Link>
					) : (
						<Link
							href="/login"
							underline="hover"
							color="inherit"
							sx={{ ml: 2 }}
						>
							Log In
						</Link>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
