import { login, register, logout } from '../../../auth.api';

type Credentials = {
	email: string;
	password: string;
};

export const handleEnter = async (
	type: 'Login' | 'Register',
	credentials: Credentials,
	onSuccess?: (data: any) => void,
	onError?: (message: string) => void,
) => {
	try {
		if (type === 'Login') {
			const data = await login(credentials);
			onSuccess?.(data);
		} else {
			const data = await register(credentials);
			onSuccess?.(data);
		}
	} catch (error: any) {
		if (error.response?.status === 401) {
			onError?.('Invalid email or password');
		} else {
			onError?.('Something went wrong. Please try again.');
		}
	}
};

export const handleExit = async (
	onSuccess?: () => void,
	onError?: (message: string) => void,
) => {
	try {
		await logout();
		onSuccess?.();
	} catch (error: any) {
		onError?.('Logout failed. Please try again.');
	}
};
