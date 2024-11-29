import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gray-900 flex items-center justify-center flex-col relative overflow-hidden'>
			{/* Simple Loading Spinner */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-violet-800 border-violet-200 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
			<p className="text-white mt-10">LOADING YOUR CONTENTS PLEASE WAIT..</p>
		</div>
	);
};

export default LoadingSpinner;
