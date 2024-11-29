import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 backdrop-blur-xl">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="Chat_IIITA_No_Background.png"
                                className="mr-3 h-16 rounded-lg dark:hidden"
                                alt="Logo"
                            />
                            <img
                                src="Chat_IIITA_White_Font_Transparent_BG.png"
                                className="mr-3 h-16 rounded-lg hidden dark:block"
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold dark:text-white text-gray-900 uppercase">Resources</h2>
                            <ul className="text-gray-500 dark:text-gray-300 text-1xl">
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:underline">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm dark:text-white font-semibold text-gray-900 uppercase">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-300 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/DevRuhela028/Chat-IIITA"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">
                                        Discord
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold dark:text-white text-gray-900 uppercase">Legal</h2>
                            <ul className="text-gray-500 font-medium dark:text-gray-300">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 dark:border-gray-500 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-500 sm:text-center dark:text-gray-300">
                        <span>© 2024 Chat-IIITA. All Rights Reserved.</span>
                    </div>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        {/* Social media icons */}
                    </div>
                </div>
            </div>
            <div className="dark:bg-gray-700 bg-purple-100 py-1">
                <p className="text-center text-gray-700 dark:text-white text-sm">Made with ❤️ in IIIT-A</p>
            </div>
        </footer>
    );
}
