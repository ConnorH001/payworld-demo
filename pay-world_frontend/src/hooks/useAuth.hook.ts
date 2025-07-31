import { useEffect, useState } from 'react';
import Api from './../auth.api';

export const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authLoading, setAuthLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await Api.get('/auth/me');
				setIsLoggedIn(true);
			} catch {
				setIsLoggedIn(false);
			} finally {
				setAuthLoading(false);
			}
		};

		checkAuth();
	}, []);

	return { isLoggedIn, setIsLoggedIn, authLoading };
};
