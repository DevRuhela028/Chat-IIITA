import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-hot-toast";
import FloatingShape from "../FloatingShape";

const Contact = () => {
    const { isAuthenticated, user } = useAuthStore(); // Assuming `user` contains the authenticated user's details
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [name,setName] = useState("");
    const { submit, isLoading, error } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && user) {
            setEmail(user.email); 
            setName(user.name)
        }
    }, [isAuthenticated, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submit(name, message);
            toast.success("Feedback submitted successfully");
            setMessage(""); 
        } catch (error) {
            toast.error("Error in submission");
            console.log(error)
        }
    };

    return (
        <div className="flex items-top justify-center min-h-[800px] bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
            <FloatingShape color='bg-violet-500 dark:bg-violet-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
            <FloatingShape color='bg-purple-500 dark:bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
            <FloatingShape color='bg-blue-500 dark:bg-blue-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />
            <div className="max-w-6xl sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-center">
                        <div className="p-6 mr-2 bg-gray-200 dark:bg-gray-800 dark:text-200 sm:rounded-lg shadow-xl mb-8 backdrop-blur-xl">
                            <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-gray-200 font-medium tracking-tight">
                                Get in touch:
                            </h1>
                            <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mt-2">
                                Feel free to contact through email or phone number
                            </p>
                            <div className="flex items-center mt-4 text-gray-600 dark:text-gray-300">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500 dark:text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    +91 7302611179
                                </div>
                            </div>
                            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500 dark:text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    chat.iiita27@gmail.com
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
                            <div className="flex flex-row p-5 border-violet-700 rounded-lg w-100">
                                <div className="text-5xl text-violet-700 dark:text-violet-500 border-violet-700">
                                    {isAuthenticated ? (
                                        <div className="flex flex-row gap-3 justify-center items-center">
                                            Give feedback!
                                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-code">
                                                <path d="M10 9.5 8 12l2 2.5" />
                                                <path d="m14 9.5 2 2.5-2 2.5" />
                                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <>Login / Signup to give feedback!</>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="name" className="hidden">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Full Name"
                                    value={name}
                                    className='w-100 mt-2 py-3 px-3 rounded-lg bg-white border text-gray-800 border-gray-400 font-semibold focus:border-violet-500 focus:outline-violet-500'
                                    disabled={true}
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="email" className="hidden">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-violet-500 focus:outline-violet-500"
                                    disabled={true} // Disable email if authenticated
                                />
                            </div>

                            <div className="flex flex-col mt-2">
                                <label htmlFor="feedback" className="hidden">
                                    Feedback
                                </label>
                                <textarea
                                    name="feedback"
                                    id="feedback"
                                    placeholder="Feedback"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-100 h-20 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-violet-700 focus:outline-violet-500 resize-none"
                                    disabled={!isAuthenticated} // Disable feedback field if not authenticated
                                />
                            </div>

                            {isAuthenticated ? (
                                <button
                                    type="submit"
                                    className="md:w-32 mb-5 bg-violet-700 hover:bg-blue-dark shadow-xl text-white font-bold p-2 py-3 rounded-xl mt-3 hover:bg-violet-800 transition ease-in-out duration-300"
                                >
                                    Submit
                                </button>
                            ) : (
                                <div className="flex flex-row gap-3 items-center mt-2">
                                    <Link to="/login">
                                        <button className="md:w-32 mb-5 bg-violet-700 shadow-xl text-white font-bold p-2  rounded-xl mt-3 hover:bg-violet-800 transition ease-in-out duration-300">
                                            Login
                                        </button>
                                    </Link>
                                    <span className="dark:text-white mb-2 text-xl"> / </span>
                                    <Link to="/signup">
                                        <button className="md:w-32 mb-5 bg-violet-700 shadow-xl text-white font-bold p-2 rounded-xl mt-3 hover:bg-violet-800 transition ease-in-out duration-300">
                                            Signup
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
