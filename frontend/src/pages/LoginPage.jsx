import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';
import FloatingShape from "../components/FloatingShape"; 
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, googleSignup, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful! Welcome back!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      await googleSignup(credential);
      toast.success("Signup successful! Welcome!");
      window.location.href = "/"; // Redirect after successful signup
    } catch (error) {
      toast.error("Google signup failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center relative overflow-hidden'>
      
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-md w-full bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden'
        >
          <div className='p-8 bg-gradient-to-br from-purple-600 to-purple-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-900  text-white'>
            <h2 className='text-4xl font-semibold mb-6 text-center '>
              Welcome Back
            </h2>

            <form onSubmit={handleLogin}>
              <Input
                icon={Mail}
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                icon={Lock}
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className='flex justify-between items-center mb-6 mt-4'>
                <Link to='/forgot-password' className='text-sm text-red-300 hover:text-red-500 underline'>
                  Forgot password?
                </Link>
              </div>
              
              {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-600 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
              </motion.button>
            </form>

            <div className='my-4 text-center'>
              <p className='text-sm text-gray-200'>Or</p>
            </div>

            <div className="flex justify-center items-center">
							<div className='inline-block scale-110'>
								<GoogleLogin 
									onSuccess={handleGoogleSignup} 
									onError={() => toast.error("Google signup failed. Please try again.")} 
									theme='outline' 
									size='large' 
									shape="rectangular"
									width={336}
									
								/>
							</div>
						</div>
          </div>

          <div className='px-8 py-4 dark:bg-gray-800 bg-opacity-60 flex justify-center'>
            <p className='text-sm dark:text-gray-300 text-gray-600'>
              Don't have an account?{" "}
              <Link to='/signup' className='text-red-400 hover:text-red-500 underline'>
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
