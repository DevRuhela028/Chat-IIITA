import { motion, px } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-hot-toast";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const { signup, googleSignup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	const handleGoogleSignup = async (credentialResponse) => {
		const { credential } = credentialResponse;
		try {
			await googleSignup(credential);
			toast.success("Signup successful! Welcome!");
			navigate("/");
			window.location.reload();
		} catch (error) {
			toast.error("Google signup failed. Please try again.");
		}
	};

	return (
		<>
			<Header />
			<div className='min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden'>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='max-w-md w-full bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-700 backdrop-blur-lg bg-opacity-60 rounded-3xl shadow-lg overflow-hidden'
				>
					<div className='p-10 bg-gradient-to-br from-purple-600 to-purple-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-900 rounded-t-3xl'>
						<h2 className='text-4xl font-semibold mb-8 text-center text-white'>
							Sign Up
						</h2>

						<form onSubmit={handleSignUp}>
							<Input icon={User} type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
							<Input icon={Mail} type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
							
							<div className="relative">
								<Input
									icon={Lock}
									type={showPassword ? 'text' : 'password'}
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div
									className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-600 '
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOff /> : <Eye />}
								</div>
							</div>
							{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
							<PasswordStrengthMeter password={password} />

							<motion.button
								className='mt-6 w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600  text-white font-semibold rounded-lg shadow-md hover:from-pink-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200 ease-in-out'
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								type='submit'
								disabled={isLoading}
							>
								{isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Create Account"}
							</motion.button>
						</form>

						<div className='my-6 text-center'>
							<p className='text-sm text-gray-400'>or sign up with</p>
						</div>
						<div className="flex justify-center items-center">
							<div className='inline-block scale-110'>
								<GoogleLogin 
									onSuccess={handleGoogleSignup} 
									onError={() => toast.error("Google signup failed. Please try again.")} 
									theme='outline' 
									size='large' 
									shape="rectangular"
									width={336}
									
								/>
							</div>
						</div>
					</div>

					<div className='px-10 py-4 bg-gray-50 dark:bg-gray-800 rounded-b-3xl flex justify-center'>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							Already have an account?{" "}
							<Link to={"/login"} className='text-indigo-500 hover:underline'>Login here</Link>
						</p>
					</div>
				</motion.div>
			</div>
			<Footer />
		</>
	);
};

export default SignUpPage;
