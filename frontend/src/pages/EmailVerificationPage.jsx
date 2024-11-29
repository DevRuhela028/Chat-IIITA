import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import FloatingShape from "../components/FloatingShape";
const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { error, isLoading, verifyEmail } = useAuthStore();

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			navigate("/dashboard");
			toast.success("Email verified successfully");
		} catch (error) {
			console.log(error);
		}
	};

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

	return (
		<div
			className='min-h-screen  bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden'
		>
			{/* Floating Shapes */}
			<FloatingShape color='bg-violet-500 dark:bg-violet-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-purple-500 dark:bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-blue-500 dark:bg-blue-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />
		<div className='max-w-md w-full bg-violet-700 backdrop-filter rounded-2xl shadow-xl overflow-hidden'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-violet-700 dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md'
			>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-gray-200 to-gray-200 text-transparent bg-clip-text'>
					Verify Your Email
				</h2>
				<p className='text-center text-gray-100 mb-6'>Enter the 6-digit code sent to your email address.</p>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-200 text-black border-2  rounded-lg focus:outline-none'
							/>
						))}
					</div>
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-white to-gray-300 text-black 
						font-bold rounded-lg shadow-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200'					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>
				</form>
			</motion.div>
		</div>
		</div>
	);
};
export default EmailVerificationPage;
