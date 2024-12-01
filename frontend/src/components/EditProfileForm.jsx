import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/auth" : "/api/auth";
const EditProfileForm = ({ user, setEditMode }) => {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Send PUT request to update profile
			const { data } = await axios.put(`${API_URL}/profile`, {
				name,
				email,
				password,
			});
			console.log("updated")
			toast.success("Profile Updated Successfully");
			
			setEditMode(false);
		} catch (error) {
			console.error("Error updating profile", error);
			toast.error("Failed to update profile");
		}
	};

	return (
		<div className="mt-2">
			<h3 className="text-3xl font-semibold dark:text-gray-100 mb-3">Edit Profile</h3>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block dark:text-gray-300">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full px-4 py-2 rounded-lg dark:bg-gray-200 text-black"
					/>
				</div>
				<div>
					<label className="block dark:text-gray-300">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 rounded-lg dark:bg-gray-200 text-black"
					/>
				</div>
				<div>
					<label className="block dark:text-gray-300">New Password (Optional)</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 rounded-lg dark:bg-gray-200 text-black"
					/>
				</div>
				<button
					type="submit"
					className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white 
							font-light rounded-full shadow-lg hover:from-pink-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2
						    transition duration-200'
				>
					Update Profile
				</button>
			</form>
		</div>
	);
};

export default EditProfileForm;
