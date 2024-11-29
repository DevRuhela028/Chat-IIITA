import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/theme";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect, useState } from "react";
import ChatPage from "./pages/ChatPage";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

function App() {
	const [themeMode, setThemeMode] = useState(() => {
		try {
			const storedTheme = localStorage.getItem("themeMode");
			return storedTheme ? JSON.parse(storedTheme) : "light";
		} catch (error) {
			return "light";
		}
	});

	const darkTheme = () => {
		setThemeMode("dark");
	};

	const lightTheme = () => {
		setThemeMode("light");
	};

	useEffect(() => {
		document.querySelector("html").classList.remove("dark", "light");
		document.querySelector("html").classList.add(themeMode);
		localStorage.setItem("themeMode", JSON.stringify(themeMode));
	}, [themeMode]);

	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<GoogleOAuthProvider clientId="136538803160-u1db190rnb7l7jfdvh6rf83hjna62ibn.apps.googleusercontent.com">
			<Toaster />
			<ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
				<Routes>
					<Route path="/" element={<Layout page="home" />} />
					<Route path="/about" element={<Layout page="about" />} />
					<Route path="/contact" element={<Layout page="contact" />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/chatpage"
						element={
							<ProtectedRoute>
								<ChatPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							<RedirectAuthenticatedUser>
								<SignUpPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route
						path="/login"
						element={
							<RedirectAuthenticatedUser>
								<LoginPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route path="/verify-email" element={<EmailVerificationPage />} />
					<Route
						path="/forgot-password"
						element={
							<RedirectAuthenticatedUser>
								<ForgotPasswordPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route
						path="/reset-password/:token"
						element={
							<RedirectAuthenticatedUser>
								<ResetPasswordPage />
							</RedirectAuthenticatedUser>
						}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</ThemeProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
