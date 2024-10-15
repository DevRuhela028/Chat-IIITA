import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import FloatingShape from '../components/FloatingShape'; // Ensure this import is correct
import { toast } from "react-hot-toast";
import ThemeBtn from "../components/ThemeBtn";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		
		try{
		await login(email, password);
            toast.success("Login successful! Welcome back!");
		}
         catch(error) {
            toast.error("Login failed. Please check your credentials.");
        }

	};

	return (
		<>
		<Header />
		<div
			className='min-h-[800px] bg-white dark:bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden'
		>
			{/* Floating Shapes */}
			<FloatingShape color='bg-violet-500 dark:bg-violet-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-purple-500 dark:bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-blue-500 dark:bg-blue-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />
			
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			>
				<div className='p-8 bg-violet-700 dark:bg-gray-800'>
					<h2 className='text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text font-sans'>
						Welcome Back
					</h2>

					<form onSubmit={handleLogin}>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<div className='flex items-center mb-6'>
							<Link to='/forgot-password' className='text-sm text-red-400 hover:underline'>
								Forgot password?
							</Link>
						</div>
						{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 bg-gradient-to-r from-white to-gray-300 text-black font-bold rounded-lg shadow-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
						</motion.button>
					</form>
				</div>
				<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
					<p className='text-sm text-white'>
						Don't have an account?{" "}
						<Link to='/signup' className='text-red-300 hover:underline'>
							Sign up
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
		<Footer />
	</>
	);
};

export default LoginPage;
