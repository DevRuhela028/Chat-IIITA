import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import FloatingShape from '../components/FloatingShape'; // Ensure this import is correct
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
		<Header />
		<div
			className='min-h-[800px] dark:bg-gray-900 flex items-center justify-center relative overflow-hidden'
		>
			{/* Floating Shapes */}
			<FloatingShape color='bg-violet-500 dark:bg-violet-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-purple-500 dark:bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-blue-500 dark:bg-blue-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
				overflow-hidden'
			>
				<div className='p-8 bg-violet-700 dark:bg-gray-800'>
					<h2 className='text-3xl font-bold mb-6 text-center bg-gray-300 text-transparent bg-clip-text'>
						Create Account
					</h2>

					<form onSubmit={handleSignUp}>
						<Input
							icon={User}
							type='text'
							placeholder='Full Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className="relative">
							<Input
								icon={Lock}
								type={showPassword ? 'text' : 'password'}
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div
								className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
							</div>
						</div>
						{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
						<PasswordStrengthMeter password={password} />

						<motion.button
							className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-white to-gray-300 text-black 
							font-bold rounded-lg shadow-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
							focus:ring-offset-gray-900 transition duration-200'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
						</motion.button>
					</form>
				</div>
				<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
					<p className='text-sm text-white'>
						Already have an account?{" "}
						<Link to={"/login"} className='text-red-300 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
		<Footer />
		</>
	);
};

export default SignUpPage;
