import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import FloatingShape from '../FloatingShape';
const TypewriterAlternating = ({ staticText, texts, speed = 150, eraseSpeed = 50, delay = 2000 }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const fullText = texts[currentIndex];

          
    return (
        <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">
            {staticText} {displayText}
        </h1>
    );
};

export default function Home() {
    const { isAuthenticated } = useAuthStore();

    return (
        <div className="mx-auto w-full min-h-[800px] dark:bg-gray-900 flex flex-col justify-center">
            <FloatingShape color='bg-violet-500 dark:bg-violet-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-purple-500 dark:bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-blue-500 dark:bg-blue-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />
            <aside className="relative overflow-hidden text-gray-800 dark:text-white rounded-lg ">
                <div className="relative max-w-screen-xl flex flex-row justify-center items-center mx-auto ">
                <img className="w-96" src="—Pngtree—chatbot messenger concept design man_6671191.png" alt="image1" />
            
                    <div className="max-w-xl  space-y-8 text-center sm:text-right sm:ml-auto">
                       
                        <h2 className="text-4xl sm:text-5xl">
                            WELCOME TO <span  className='text-violet-700 dark:text-violet-500 font-medium'>CHAT-IIITA</span>
                            <span className="hidden sm:block text-4xl mt-3">Click below to start a chat!</span>
                        </h2>

                        {isAuthenticated ? (
                            <Link
                                className="inline-flex text-white text-3xl items-center px-6 py-2  shadow-2xl bg-violet-700 rounded-xl hover:bg-violet-800 hover:translate-x-5 transition duration-1000"
                                to="/chatpage"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
                                &nbsp; Let's Chat !
                            </Link>
                        ) : (
                            <Link
                                className="inline-flex text-white text-2xl items-center px-6 py-3 shadow-2xl bg-violet-700 rounded-xl hover:bg-violet-800 hover:translate-x-5 transition duration-1000"
                                to="/signup"
                            >
                                <svg
                                    fill="white"
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                                </svg>
                                &nbsp; Signup to Chat-IIITA
                            </Link>
                        )}
                    </div>
                </div>

                    
               
            </aside>

            <div className="relative flex flex-row items-center justify-evenly p-18 dark:text-white">
                <div className="w-50 h-10 m-10 z-10">
                    <span className="text-5xl">
                        THE ULTIMATE <span className='text-5xl text-violet-700 dark:text-violet-500 font-medium'>TECHPARENT</span>
                    </span>
                </div>
                
                <div className="flex-shrink-0 z-10">
                    <img className="sm:w-96 w-48 h-100" src="—Pngtree—chatbot messenger concept design man_6671190.png" alt="image2" />
                </div>
            </div>
        </div>
    );
}
