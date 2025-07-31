import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Api from './auth.api';
import Header from './components/header/header.component';
import { useAuth } from './hooks/useAuth.hook';

const App: React.FC = () => {
	Api.init();
	const { isLoggedIn, setIsLoggedIn, authLoading } = useAuth();

	if (authLoading) return <div>Loading...</div>;

	return (
		<>
			<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Router>
				<Routes>
					<Route
						path="/login"
						element={<Login setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route
						path="/"
						element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
