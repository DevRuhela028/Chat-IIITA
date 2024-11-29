import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import FloatingShape from '../FloatingShape';
import { Target, CheckCircle, Cpu, List ,Star ,Sparkles,LogIn, WandSparkles , Mic} from "lucide-react";
const Home = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="mx-auto w-full min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 flex flex-col justify-center">
            {/* Combined Hero and Techparent Section */}
            <div className="relative max-w-screen-xl flex flex-col md:flex-row justify-between items-center mx-auto px-6 py-12 space-y-8 md:space-y-0">
                {/* Left Content */}
                <div className="flex-shrink-0 mt-8 md:mt-0">
                    <img className="w-full md:w-96 rounded-xl " src="—Pngtree—chatbot messenger concept design man_6671191.png" alt="Chatbot" />
                </div>
                <div className="max-w-2xl text-center md:text-right   space-y-6">
                    <h2 className="text-5xl font-bold text-gray-800 dark:text-white">
                        WELCOME TO <span className="text-violet-700 dark:text-violet-500">CHAT-IIITA</span>
                    </h2>
                    <p className="text-2xl text-gray-600 dark:text-gray-300">
                        The ultimate platform for your college-related queries, powered by AI chatbot.
                    </p>

                    <div className="space-x-4">
                        {isAuthenticated ? (
                            <Link
                                className="inline-flex items-center px-6 py-3 bg-violet-700 text-white text-xl rounded-xl shadow-3xl transform hover:bg-violet-800 hover:translate-x-2 transition-all duration-300"
                                to="/chatpage"
                            >
                                <Sparkles className="mr-2" /> Let's Chat!
                            </Link>
                        ) : (
                            <Link
                                className="inline-flex items-center px-6 py-3 bg-violet-700 text-white text-xl rounded-xl shadow-3xl transform hover:bg-violet-800 hover:translate-x-2 transition-all duration-300"
                                to="/signup"
                            >
                                <LogIn className="mr-2" /> Get Started
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right Image */}
                
            </div>

            {/* Techparent Section */}
            <div className="relative max-w-7xl flex flex-col md:flex-row justify-between items-center mx-auto px-6 py-12 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-xl shadow-2xl space-y-8 md:space-y-0">
                <div className="max-w-lg text-center md:text-left space-y-6">
                    <span className="text-4xl font-semibold text-gray-800 dark:text-white">
                        THE ULTIMATE <span className="text-violet-700 dark:text-violet-500">"TECHPARENT"</span>
                    </span>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        An essential guide for  providing instant and accurate responses to your queries along with
                        facilitating easy access to information about college activities and academic structure.
                    </p>
                </div>

                <div className="flex-shrink-0 mt-8 md:mt-0">
                    <img className="w-full md:w-96 rounded-xl " src="—Pngtree—chatbot messenger concept design man_6671190.png" alt="Techparent" />
                </div>
            </div>

            {/* Chatbot Tutorial Section */}
            <div className="relative max-w-screen-xl mt-10 flex flex-col md:flex-row space-x-20 gap-10 items-center mx-auto px-6 py-12 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-2xl">
                {/* Left Image */}
                <div className="flex-shrink-0 w-full md:w-1/2">
                    <img className="w-full rounded-xl shadow-xl" src="C9D9D3F6-0C30-4487-A2E9-C4F3EC0B067D.jpeg" alt="Chatbot" />
                </div>

                {/* Right Content - Explanation */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                <div className='flex flex-row  items-center mb-6 gap-2 dark:text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-question"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>   
                    <span className="text-3xl font-semibold text-gray-800 dark:text-white">How to Use CHAT-IIITA ? </span>
                </div>
                    <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300 ">
                        <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            Start by clicking on "Lets Chat" button or "Chat-IIITA" button on header once logged in.
                        </li>
                        <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            Ask any query related to courses, faculty, or college services.
                        </li>
                        <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            Click over the pre-set questions or give a prompt by your own.
                        </li>
                        <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            Receive real-time answers or guidance from the chatbot instantly.
                        </li>
                    </ul>
                </div>

            </div>
            <div className="relative mb-8 mt-8 max-w-screen-xl flex flex-col md:flex-row justify-between gap-10 items-center mx-auto px-6 py-12 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-xl shadow-2xl">
                {/* Left Content - Explanation */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                <div className='flex flex-row gap-3 dark:text-white items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                    <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Get Instant Replies on Your College-Related Queries</h3>
                </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 ml-9">
                        With CHAT-IIITA, you can get quick answers to all your college-related questions. Whether you're inquiring about courses, faculty, or campus facilities, our chatbot provides accurate and real-time responses.
                    </p>
                    <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-check-circle">
                                <path d="M9 11l3 3L22 4" />
                            </svg>
                            Ask about course details, faculty office timings, and more!
                        </li>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 lucide lucide-check-circle">
                                <path d="M9 11l3 3L22 4" />
                            </svg>
                            Get information instantly without waiting for long hours.
                        </li>
                    </ul>
                </div>

                {/* Right Image */}
                <div className="flex-shrink-0 w-full md:w-1/2">
                    <img className="w-full rounded-xl shadow-xl" src="2A452A86-8336-4A8C-8975-065F387B50C6.jpeg" alt="Instant Replies" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-12 mt-8 mx-auto max-w-screen-xl">
    {/* Left Section: Image */}
    <div className="w-full md:w-1/2 flex flex-col items-center ">
        <div className='flex dark:text-white justify-center items-center mb-3 gap-4 text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gem"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
            <h1 className='text-3xl text-left font-bold'>SPECIAL FEATURES OF CHATBOT</h1>
        </div>
        <img 
            src="50C4C33A-D4BB-435A-B103-795B77741B8B.jpeg" 
            alt="Functionality Overview" 
            className="w-full h-fit object-cover rounded-xl shadow-2xl"
        />
        <img 
            src="5F9C8F90-2C07-4FA0-B28E-EF744FDC096D.jpeg" 
            alt="Functionality Overview" 
            className="w-full mt-8 h-fit object-cover rounded-xl shadow-2xl"
        />
        
    </div>
    

    {/* Right Section: Cards */}
    <div className="w-full md:w-1/2 flex flex-col gap-3">
        {/* Card 1: Add New Chats */}
        <div className="w-full p-2 bg-gray-50 dark:bg-gray-800 shadow-2xl rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-3xl font-semibold text-center text-blue-700 dark:text-blue-500 mb-4">
                <Star/> Add New Chats
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
                Start a new conversation anytime you have a query or need assistance.
            </p>
        </div>

        {/* Card 2: Important Links */}
        <div className="w-full p-2 bg-gray-50 dark:bg-gray-800 shadow-xl rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-3xl font-semibold text-center text-teal-600 dark:text-teal-300 mb-4">
                <Star/> Navigate Important Links
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
                Quick access to essential links like  faculty profiles, notes and PYQs.
            </p>
        </div>

        {/* Card 3: Save Chats */}
        <div className="w-full p-2 bg-gray-50 dark:bg-gray-800 shadow-xl rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-3xl font-semibold text-center text-yellow-500 dark:text-yellow-300 mb-4">
                <Star/> Save & Reuse Chats
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
                Save your important conversations for future reference.
            </p>
        </div>
        <div className="w-full p-2 bg-gray-50 dark:bg-gray-800 shadow-xl rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-3xl font-semibold text-center text-pink-600 dark:text-pink-500 mb-4">
                <Star/> <p className='flex gap-2 items-center justify-center'>Re-phrase using AI <WandSparkles/></p>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
                Re-phrase your prompt using AI feature for a faster response from chatbot.
            </p>
        </div>
        <div className="w-full p-2 bg-gray-50 dark:bg-gray-800 shadow-xl rounded-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-3xl font-semibold text-center text-orange-500 dark:text-orange-500 mb-4">
                <Star/> <p className='flex gap-2 items-center justify-center'>Voice-to-text using AI <Mic/></p>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
                Write your prompts using voice with ease.
            </p>
        </div>
    </div>
</div>


        </div>
        
    );
};

export default Home;
