import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-hot-toast";
import FloatingShape from "../FloatingShape";
import { GoogleLogin } from '@react-oauth/google';

const Contact = () => {
    const { isAuthenticated, user } = useAuthStore();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const { submit, isLoading, error, googleSignup } = useAuthStore();

    const handleGoogleSignup = async (credentialResponse) => {
        const { credential } = credentialResponse;
        try {
            await googleSignup(credential);
            toast.success("Signup successful! Welcome!");
            window.location.href = "/";
            window.location.reload();
        } catch (error) {
            window.location.href = "/";
            window.location.reload();
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            setEmail(user.email);
            setName(user.name);
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
            console.log(error);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
            

            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-10">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        {/* Left Section */}
                        <div className="flex flex-col justify-center items-start p-6 bg-gradient-to-r from-violet-100 via-blue-100 to-pink-100 dark:bg-gradient-to-r dark:from-gray-200 dark:via-gray-200 dark:to-gray-200 rounded-lg text-gray-800  shadow-xl backdrop-blur-sm w-full md:w-1/2 mb-6 md:mb-0">
                            <h1 className="text-4xl font-semibold text-gray-700 mb-4">Let's Connect!</h1>
                            <p className="text-lg font-medium text-gray-600  mb-6">
                                Whether you have questions or just want to say hi, we'd love to hear from you!
                            </p>
                            <div className="flex items-center text-gray-600  mb-4">
                                <svg className="w-8 h-8 mr-3 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +91 7302611179
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-8 h-8 mr-3 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                chat.iiita27@gmail.com
                            </div>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-pink-100 dark:bg-gray-900 p-6 rounded-lg shadow-xl">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">We Value Your Feedback</h2>
                            <div className="flex flex-col mb-4">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    className="p-4 rounded-lg bg-white border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                                    disabled
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    className="p-4 rounded-lg bg-white border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                                    disabled
                                    placeholder="Email"
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <textarea
                                    id="feedback"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="p-4 h-32 rounded-lg bg-white border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500 transition ease-in-out resize-none"
                                    placeholder="Your Feedback"
                                    disabled={!isAuthenticated}
                                ></textarea>
                            </div>

                            {isAuthenticated ? (
                                <button type="submit" className="w-full p-3 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold shadow-lg hover:bg-gradient-to-r hover:from-pink-700 hover:to-pink-700 transition-all duration-300">
                                    Submit
                                </button>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <Link to="/login">
                                        <button className="w-full flex items-center py-1 px-10 rounded-lg bg-pink-600 text-white font-light shadow-lg hover:bg-pink-700 transition-all duration-300">
                                            Login
                                        </button>
                                    </Link>
                                    <span className="mx-3 dark:text-white text-gray-700 text-lg">or</span>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSignup}
                                        onError={() => toast.error("Google signup failed. Please try again.")}
                                        theme="outline"
                                        size="medium"
                                    />
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Additional Section */}
                    <div className="mt-12 text-center">
                        <h3 className="text-3xl font-light  text-gray-700 dark:text-gray-100">
                            <span className="flex justify-left text-5xl text-pink-500">Your voice matters! </span>
                            <span className="flex justify-left text-4xl mt-4">Help us improve by sharing your thoughts.</span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
