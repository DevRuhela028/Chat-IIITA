import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { Link } from "react-router-dom"; // Updated import from 'react-router-dom'
import { Home as HomeIcon } from "lucide-react"; // Import the Home icon from lucide-react
import EditProfileForm from '../components/EditProfileForm';  // Import EditProfileForm component
import FloatingShape from "../components/FloatingShape";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const [editMode, setEditMode] = useState(false);

	const handleLogout = () => {
		logout();
	};

	return (
		<>
		<Header />
		<div
			className='min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden'
		>
			{/* Floating Shapes */}
			<FloatingShape color='bg-violet-500 dark:bg-violet-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-purple-500 dark:bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-blue-500 dark:bg-blue-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full mx-auto mt-10 p-8 bg-violet-700 dark:bg-gray-800 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl"
			>
				<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-gray-200 to-gray-200 text-transparent bg-clip-text">
					Dashboard
				</h2>

				{/* Display profile info */}
				<div className="space-y-6">
					<motion.div
						className="p-4 bg-gray-200 rounded-xl shadow-xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<h3 className="text-xl font-semibold text-black mb-3">Profile Information</h3>
						<p className="text-gray-900">Name: {user.name}</p>
						<p className="text-gray-900">Email: {user.email}</p>
					</motion.div>
					<motion.div
						className="p-4 bg-gray-200 rounded-xl shadow-xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<h3 className="text-xl font-semibold text-black mb-3">Account Activity</h3>
						<p className="text-gray-900">
							<span className="font-bold">Joined: </span>
							{new Date(user.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
						<p className="text-gray-900">
							<span className="font-bold">Last Login: </span>
							{formatDate(user.lastLogin)}
						</p>
					</motion.div>
				</div>

				{/* Add Edit Profile Button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="mt-4"
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => setEditMode(!editMode)}
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-white to-gray-300 text-black 
								font-bold rounded-lg shadow-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2
								focus:ring-offset-gray-900 transition duration-200'
					>
						{editMode ? 'Cancel' : 'Edit Profile'}
					</motion.button>
				</motion.div>

				{/* Display Edit Profile Form */}
				{editMode && <EditProfileForm user={user} setEditMode={setEditMode} />}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8 }}
					className="mt-4"
				>
					{/* Logout Button */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleLogout}
						className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-orange-600 text-white 
						font-bold rounded-lg shadow-lg hover:bg-red-700 
						focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-900"
					>
						Logout
					</motion.button>
				</motion.div>

				{/* Go to Home Button with Home Icon */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.0 }}
					className="mt-4"
				>
					<Link to="/">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="w-full py-3 px-4 bg-gradient-to-r from-gray-300 to-gray-200 text-black 
							font-bold rounded-lg shadow-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2
							focus:ring-offset-gray-900 flex items-center justify-center gap-2"
						>
							<HomeIcon className="w-5 h-5" />
							Redirect to Home
						</motion.button>
					</Link>
				</motion.div>
			</motion.div>
		</div>
		<Footer />
		</>
	);
};

export default DashboardPage;
