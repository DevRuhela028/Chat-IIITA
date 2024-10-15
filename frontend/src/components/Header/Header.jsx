import React from 'react'
import {Link ,NavLink} from 'react-router-dom'
import { motion } from 'framer-motion';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import { useAuthStore } from '../../store/authStore';
import {toast} from 'react-hot-toast'
import { AlignJustify } from 'lucide-react';
import ThemeBtn from '../ThemeBtn';
function Header() {
    const { isAuthenticated } = useAuthStore();
    const { user, logout } = useAuthStore();

	const handleLogout = () => {
		try{
            logout();
            const name = user.email
            toast.success(name+" is logged out successfully")
        }
        catch(error){
            toast.error("could not logout")
        }
	};

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white dark:bg-gray-800 border-gray-200 dark:border-white px-4 lg:px-6 py-2.5 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl text-1xl ">
                    <Link to="/" className="flex items-center">
                        <img
                            src="file.png"
                            className="mr-3 h-12 "
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex  items-center lg:order-2">
                        {isAuthenticated ? (
                            // Show Dashboard button when authenticated
                            <>
                                <div className='flex flex-row gap-3'>
                                    <Link
                                        to="/dashboard"
                                        className="flex flex-row gap-2 justify-center items-center text-white bg-violet-700 hover:bg-violet-800 font-medium rounded-lg text-sm px-4 lg:px-3 py-1 lg:py-1 mr-2 focus:outline-none transition ease-in-out shadow-2xl"
                                    >
                                        <AlignJustify className="w-4 h-4" />
                                        <span className="">Dashboard</span>
                                    </Link>
                                    <motion.button
                                        onClick={handleLogout}
                                        className=" h-9 px-3 mr-3 bg-red-500 text-white text-sm
                                         rounded-lg shadow-2xl hover:bg-red-600  flex flex-row justify-center items-center gap-2"
                                        >
                                        Logout
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                                    </motion.button>
                                
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Show Login button when not authenticated */}
                                <NavLink
                                    to="/login"
                                    className={({isActive}) => `text-gray-800 dark:text-white  dark:hover:bg-gray-700 hover:bg-gray-200 font-medium rounded-lg text-sm px-2 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`}
                                >
                                    <div className='flex flex-row justify-center items-center gap-2'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>

Log in</div>
                                    
                                </NavLink>

                                <Link
                                    to="/signup"
                                    className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 transition ease-in-out focus:outline-none shadow-lg"
                                >
                                    Get started
                                </Link>
                            </>
                        )}
                        <ThemeBtn />
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 ${isActive ? "text-violet-700 dark:text-white" : "text-gray-700 dark:text-gray-300" }  duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-violet-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/About"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 ${isActive ? "text-violet-700 dark:text-white" : "text-gray-700 dark:text-gray-300" }  duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-violet-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 ${isActive ? "text-violet-700 dark:text-white" : "text-gray-700 dark:text-gray-300" }  duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-violet-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            {isAuthenticated ? (
                                
                                <NavLink
                                to="/chatpage"
                                className={({isActive}) => `flex flex-row block py-2 pr-4 pl-3 ${isActive ? "text-violet-700 dark:text-white" : "text-gray-700 dark:text-gray-400"} font-bold duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-violet-700 lg:p-0`}
                                >
                                    Chat-IIITA  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                                </NavLink>
                                   
                            ) : (
                                <>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;