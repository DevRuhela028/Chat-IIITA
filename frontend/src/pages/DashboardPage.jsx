import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import EditProfileForm from "../components/EditProfileForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { formatDate } from "../utils/date";
import toast from "react-hot-toast";
import { Trash2 ,Pencil , LogOut , X } from "lucide-react";
const DashboardPage = () => {
  const { user, logout, editProfile, setPass , deleteUser} = useAuthStore(); // Assume setPassword method in authStore
  const { searches } = useChatStore();
  const [editMode, setEditMode] = useState(false);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmDelete , setConfirmDelete] = useState(false);
  const [confirmLogout , setConfirmLogout] = useState(false);
  useEffect(() => {
    // Show set password modal if the user hasn’t set a password (password is null or an empty string)
    if (!user.isPassword) {
      setShowSetPasswordModal(true);
    }
    
  }, [user]);

  const handleSetPasswordSubmit = async () => {
    if (password === confirmPassword) {
      try {
        
        await setPass(user.email,password); // Use setPassword from authStore to update the user's password
        toast.success("Password is set successfully")
        setShowSetPasswordModal(false); // Close modal after setting password
       
      } catch (error) {
        toast.error("Error setting password")
        console.error("Error setting password:", error);
      }
    } else {
      alert("Passwords do not match!");
    }
  };
  // Function to load last searches from localStorage
  const loadLastSearches = () => {
    const lastSearches = JSON.parse(localStorage.getItem("lastSearches")) || [];
    return lastSearches;
  };

  const handleLogout = () => {
    logout();
    setConfirmDelete(false);
  };

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const confirmDeletion = () => {
    setConfirmDelete(true)
  }
  const confirmLoggingout = () => {
    setConfirmLogout(true)
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.email); // Use setPassword from authStore to update the user's password
      toast.success("Profile is deleted successfully")
      setShowSetPasswordModal(false); // Close modal after setting password
     
    } catch (error) {
      toast.error("Error deleting profile")
      console.error("Error deleting profile:", error);
    }
  }
  const handleProfileUpdate = (updatedProfile) => {
    // Update the profile information
    editProfile(updatedProfile);
    setEditMode(false);  // Close the edit mode after successful update
  };

  useEffect(() => {
    // Load the last searches when the component mounts
    const lastSearches = loadLastSearches();
    // Optionally, you could update the state for displaying them in the UI
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
        {/* Floating Shapes for an aesthetic touch */}
        {/* Dashboard Container */}
        {showSetPasswordModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-sm"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Set Your Password</h2>
                <p className="mb-4 mt-2 text-pink-700 dark:text-pink-500">Set your password for logging in manually in future</p>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  onClick={handleSetPasswordSubmit}
                  className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-md hover:from-pink-700 hover:to-pink-700"
                >
                  Set Password
                </button>
                <button
                  onClick={() => setShowSetPasswordModal(false)}
                  className="mt-3 w-full py-2 px-4 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <p className="text-sm text-red-600"> *this is generated beacuse you logged in using google.</p>
              </motion.div>
            </div>
          )}
          {confirmLogout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-pink-100 dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-sm"
              >
                <h1 className=" text-black dark:text-gray-200 mb-4 text-lg font-semibold">You really want to logout?</h1>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-4 bg-red-600  text-white rounded-2xl shadow-md hover:bg-red-700 "
                >
                  Yes, Logout !
                </button>
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="mt-2 w-full py-2 px-4 text-black dark:text-white"
                >
                  Cancel
                </button>
              </motion.div>
            </div>
          )}
          {confirmDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-pink-100 dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-sm"
              >
                <h1 className=" text-black dark:text-gray-200  text-lg font-semibold">You really want to delete your profile?</h1>
                <h1 className="mb-4  mt-2 font-light dark:text-gray-300"> <span className="text-red-600 font-semibold">WARNING</span> : This action will permanently delete your account. </h1>
                <button
                  onClick={handleDeleteUser}
                  className="w-full py-2 px-4 bg-red-600  text-white rounded-2xl shadow-md hover:bg-red-700 "
                >
                  Yes, I want to delete !
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="mt-2 w-full py-2 px-4 text-black dark:text-white"
                >
                  Cancel
                </button>
              </motion.div>
            </div>
          )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex max-w-screen-xl p-8 bg-gray-100 dark:bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl backdrop-filter backdrop-blur-2xl space-x-8"
        >
          {/* Left Section: Profile Information */}
		  
          <div className="flex-1 max-w-md ">
			<div className="text-4xl font-semibold mb-5 text-gray-700 dark:text-white">
				Welcome , {user.name} !
			</div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-pink-200 to-purple-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl mb-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3">Profile Information</h3>
              <p className="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-gradient-to-br from-pink-200 to-purple-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-800  rounded-2xl shadow-xl mb-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3">Account Details</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Joined: {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p className="text-gray-700 dark:text-gray-300">Last Login: {formatDate(user.lastLogin)}</p>
            </motion.div>

            {/* Edit Profile Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex flex-col items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditProfile}
                className="w-full py-3 px-6 bg-gradient-to-r from-teal-400 to-teal-500  text-white font-light rounded-full shadow-lg transform transition duration-300 ease-in-out"
              >

                {/* {editMode ? "Cancel " : "Edit Profile"} */}
                {editMode ? (<span className="flex gap-1 justify-center items-center text-black font-semibold"> Cancel <X className="h-4 w-4"/> </span>

                ) : (<span className="flex gap-1 justify-center items-center text-black font-semibold">Edit Profile <Pencil className="h-4 w-4" /></span>)}
              </motion.button>
            </motion.div>

            {/* Logout Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmLoggingout}
                className="w-full py-3 font-light px-6 bg-gradient-to-r from-teal-400 to-teal-500  text-white  rounded-full  transform transition duration-300 ease-in-out"
              >
                <span className="flex gap-1 justify-center items-center text-black font-bold ">Logout <LogOut className="h-4 w-4"/></span>
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmDeletion}
                className="w-full py-3 font-light px-6 bg-gradient-to-r from-red-600 to-red-600 text-white  rounded-full shadow-lg transform transition duration-300 ease-in-out"
              >
                <span className="flex gap-1 justify-center items-center">Delete this profile <Trash2 className="h-4 w-4" /></span>
              </motion.button>
            </motion.div>
          </div>
          
          {/* Right Section: Conditional Rendering of Recent Searches or EditProfileForm */}
          <div className="flex-1 ">
            {editMode ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gradient-to-br from-pink-200 to-purple-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl"
              >
                <EditProfileForm user={user} setEditMode={setEditMode} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gradient-to-br from-pink-200 to-purple-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl"
              >
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-3">Recent Searches</h3>
                <ul className="space-y-3">
                  {searches.length > 0 ? (
                    searches.map((search, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {search}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">No recent searches</p>
                  )}
                </ul>
              </motion.div>
            )}
           
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
