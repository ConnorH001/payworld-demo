import { useState } from 'react';
import AuthForm from '../forms/auth-form/auth-form.component';

interface Props {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const Login = ({ setIsLoggedIn }: Props) => {
	const [authType, setAuthType] = useState<'Login' | 'Register'>('Login');

	return (
		<AuthForm
			type={authType}
			onSwitch={() => setAuthType(authType === 'Login' ? 'Register' : 'Login')}
			setIsLoggedIn={setIsLoggedIn}
		/>
	);
};

export default Login;
