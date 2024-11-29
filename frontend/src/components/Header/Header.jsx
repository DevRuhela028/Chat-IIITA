import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { AlignJustify, Menu, X , Sparkles , LogOutIcon ,LogInIcon } from 'lucide-react';
import ThemeBtn from '../ThemeBtn';

function Header() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [confirmLogout , setConfirmLogout] = useState(false);
    const confirmLoggingout = () => {
        setConfirmLogout(true);
    }
    const handleLogout = () => {
        try {
            logout();
            const name = user.email;
            toast.success(name + " is logged out successfully");
        } catch (error) {
            toast.error("could not logout");
        }
    };

    return (
        <header className="shadow sticky z-50 top-0 bg-white dark:bg-gray-800">
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
            <nav className="border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                    <Link to="/" className="flex items-center">
                        <img
                            src="Chat_IIITA_No_Background.png"
                            className="h-12 rounded-lg dark:hidden"
                            alt="Logo"
                        />
                        <img
                            src="Chat_IIITA_White_Font_Transparent_BG.png"
                            className="h-12 rounded-lg hidden dark:block"
                            alt="Logo"
                        />
                    </Link>

                    {/* Toggle menu for mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-800 dark:text-white lg:hidden focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop menu */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-lg ${isActive ? 'text-violet-500' : 'text-gray-700 dark:text-gray-300'} hover:text-violet-700`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/About"
                            className={({ isActive }) =>
                                `text-lg ${isActive ? 'text-violet-500' : 'text-gray-700 dark:text-gray-300'} hover:text-violet-700`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/Contact"
                            className={({ isActive }) =>
                                `text-lg ${isActive ? 'text-violet-500' : 'text-gray-700 dark:text-gray-300'} hover:text-violet-700`
                            }
                        >
                            Contact
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                                to="/chatpage"
                                className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-violet-700"
                            >
                                Chat-IIITA
                                <Sparkles className="ml-1 h-5 w-5" />
                            </NavLink>
                        )}
                    </div>

                    {/* Auth buttons and Theme toggle */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center bg-violet-700 text-white text-sm px-3 py-2 rounded-lg shadow-md hover:bg-violet-800"
                                >
                                    Dashboard
                                    <AlignJustify className="ml-1 h-5 w-5"/>
                                </Link>
                                <motion.button
                                    onClick={confirmLoggingout}
                                    className="flex items-center bg-red-500 text-white text-sm px-3 py-2 rounded-lg shadow-md hover:bg-red-600"
                                >
                                    Logout
                                    <LogOutIcon className="ml-1 h-5 w-5"/>
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="flex items-center text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg px-3 py-2 text-sm"
                                >
                                    <span className='flex items-center justify-center'> <LogInIcon className='h-4 w-4 mr-2' /> Login</span>
                                </NavLink>
                                <Link
                                    to="/signup"
                                    className="bg-violet-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-violet-800"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                        <ThemeBtn />
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-lg text-gray-700 dark:text-gray-300"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/About"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-lg text-gray-700 dark:text-gray-300"
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-lg text-gray-700 dark:text-gray-300"
                                >
                                    Contact
                                </NavLink>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <NavLink
                                        to="/chatpage"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center py-2 text-lg text-gray-700 dark:text-gray-300"
                                    >
                                        Chat-IIITA
                                        <AlignJustify className="ml-1" />
                                    </NavLink>
                                </li>
                            )}
                            {isAuthenticated ? (
                                <li>
                                    <motion.button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left py-2 text-lg text-red-500"
                                    >
                                        Logout
                                    </motion.button>
                                </li>
                            ) : (
                                <li className="flex justify-between space-x-4">
                                    <NavLink
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-2 text-lg text-gray-700 dark:text-gray-300"
                                    >
                                        Log In
                                    </NavLink>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-2 bg-violet-700 text-white rounded-lg text-center shadow-lg"
                                    >
                                        Get Started
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
