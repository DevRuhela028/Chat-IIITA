import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import Header from "../components/Header/Header";
import FloatingShape from "../components/FloatingShape";
import Footer from "../components/Footer/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import ThemeBtn from "../components/ThemeBtn";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { user  ,logout} = useAuthStore();
    const [iscomp,setIscomp] = useState(true)

 

    const clickbutton = async (e) => {
        const userInput = e;  // 'e' is the input string
    
        console.log("before");
        console.log("input:", userInput);
    
        if (userInput.trim()) {
            console.log("after");
    
            // Display user message
            setMessages([...messages, { text: userInput, sender: "user" }]);
            setInput("");  // Clear input field
            setLoading(true);  // Show loading animation
    
            try {
                // Make the POST request to your backend
                const response = await axios.post("https://huggingface.co/spaces/DevRuhela/Chat-IIITA-Python/api/chat", {
                    input: userInput,
                });
    
                console.log("Backend response:", response.data);  // Debugging log
    
                // Extract the result from the response
                const aiResponse = response.data.answer.result;
    
                if (aiResponse) {
                    // Add AI response to the messages list
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: "", sender: "ai", typing: true },  // Typing effect
                    ]);
                    simulateTypewriterEffect(aiResponse);  // Show typewriter effect
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (error) {
                console.error("Error fetching AI response:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Error fetching AI response. Please try again later.", sender: "ai" },
                ]);
            } finally {
                setLoading(false);  // Remove loading animation
            }
        }
    };
    
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

    // useEffect(() => {
    //     // Load messages from local storage when the component mounts
    //     const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    //     setMessages(savedMessages);
    // }, []);

    // useEffect(() => {
    //     // Save messages to local storage whenever they change
    //     localStorage.setItem("chatMessages", JSON.stringify(messages));
    // }, [messages]);
    
    const handleSend = async (e) => {
    e.preventDefault();

    if (input.trim()) {
        // Display user message
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");  // Clear input field
        setLoading(true);  // Show loading animation

        try {
            // Make the POST request to your Hugging Face backend
            const response = await axios.post("https://huggingface.co/spaces/DevRuhela/Chat-IIITA-Python/api/chat", {
                text: input,  // Adjusted to match your FastAPI request model
            });

            console.log("Backend response:", response.data);  // Debugging log

            // Extract the result from the response
            const aiResponse = response.data.answer;

            if (aiResponse) {
                // Add AI response to the messages list
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "", sender: "ai", typing: true },  // Typing effect
                ]);
                simulateTypewriterEffect(aiResponse);  // Show typewriter effect
            } else {
                throw new Error("Invalid response structure");
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Error fetching AI response. Please try again later.", sender: "ai" },
            ]);
        } finally {
            setLoading(false);  // Remove loading animation
        }
    }
};

    
    

    // Simulate typewriter effect
    const simulateTypewriterEffect = (fullText) => {
        setIscomp(false)
        let currentText = "";
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                currentText += fullText[index];
                index++;
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].text = currentText;
                    setIscomp(true)
                    return updatedMessages;
                });
            } else {
                clearInterval(interval);
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].typing = false;
                    setIscomp(true)
                    return updatedMessages;
                });
            }
        }, 12); // Adjust the speed of the typing effect here
        
    };

    return (
        <>
            
            <div className="min-h-screen bg-violet-200 dark:bg-gray-900 flex flex-row items-center justify-center ">
                {/* <FloatingShape color="bg-violet-500 dark:bg-violet-700" size="w-64 h-64" top="-5%" left="10%" delay={0} />
                <FloatingShape color="bg-purple-500 dark:bg-purple-700" size="w-48 h-48" top="70%" left="80%" delay={5} />
                <FloatingShape color="bg-blue-500 dark:bg-blue-700" size="w-32 h-32" top="40%" left="-10%" delay={2} /> */}
                <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative left-0  w-72 bg-violet-100   dark:bg-gray-800  dark:bg-opacity-90 text-white overflow-y-auto backdrop-blur-xl flex flex-col justify-between"
    style={{ height:'100vh' }}
>
    {/* Sidebar Header */}
    <div className="flex  text-black dark:text-white items-center justify-left ml-4 gap-2 mt-3">
    <svg 
    xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/>
    </svg>
    <h1 className="text-4xl bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent font-medium">Chat-IIITA</h1>
    
    </div>
    <div className="p-8 pl-4">
    
        <h2 className="text-xl font-light mb-4 dark:text-white text-black ">Quick Links</h2>
        <ul className="space-y-4">
            <li>
                <Link
                    to="/"
                    className="flex items-center text-black dark:text-white border-violet-100 space-x-2  dark:hover:bg-gray-700 p-2 rounded-lg transition-colors hover:bg-violet-50 dark:border-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    <span>Home</span>
                </Link>
            </li>      
        </ul>
            
        <h2 className="text-xl font-light mb-4 mt-4 dark:text-white text-black border-t border-black dark:border-gray-400 pt-3">Important Links</h2>
        <ul className="space-y-1">
            <li>
                <Link
                    target="blank"
                    to="https://placement.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>Placement cell </span>
                </Link>
            </li>
            <li>
                <Link
                    target="blank"
                    to="https://erp.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>ERP IIITA</span>
                </Link>
            </li>
            <li>
                <Link
                    target="blank"
                    to="https://examcell.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>AAA</span>
                </Link>
            </li>
            <li>
                <Link
                    to="https://placement.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>Placement cell</span>
                </Link>
            </li>
        </ul>
        <h2 className="text-xl font-light mb-4 mt-4 dark:text-white text-black border-t border-black dark:border-gray-400 pt-3">Teaching Profile and Notes</h2>
        <ul className="space-y-1">
            <li>
                <Link
                    target="blank"
                    to="https://profile.iiita.ac.in/srdubey/teaching.php"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>PSP</span>
                </Link>
            </li>
            <li>
                <Link
                    target="blank"
                    to="https://profile.iiita.ac.in/seemak/Teaching.php"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>LAL</span>
                </Link>
            </li>
            <li>
                <Link
                    target="blank"
                    to="https://profile.iiita.ac.in/srijit/teaching.html"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>EP</span>
                </Link>
            </li>
        </ul>
        <h2 className="text-xl font-light mb-4 mt-4 dark:text-white text-black border-t border-black dark:border-gray-400 pt-3">Notes and PYQs</h2>
        <ul className="space-y-1 ">
            <li>
                <Link
                    target="blank"
                    to="https://profile.iiita.ac.in/srdubey/teaching.php"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>PSP</span>
                </Link>
            </li>
            <li>
                <Link
                    target="blank"
                    to="https://profile.iiita.ac.in/seemak/Teaching.php"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>

                <span>LAL</span>
                </Link>
            </li>
            
        </ul>
        <ul className="mt-4">
            <li>
                <ThemeBtn />
            </li>
        </ul>
    </div>

    {/* Sidebar Footer */}
    <div className="p-6 border-t flex flex-col  border-gray-700 dark:border-gray-300 gap-3">
        <Link
            to="/dashboard"
            className="flex items-center text-black dark:text-white border-violet-100 space-x-2  dark:hover:bg-gray-700 p-2 rounded-lg transition-colors border-2 hover:border-black dark:border-0"
                >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Profile</span>
        </Link>
        <motion.button
            onClick={handleLogout}
            className="w-full h-10 bg-red-500 text-white text-sm
                rounded-lg shadow-2xl hover:bg-red-600  flex flex-row justify-center items-center gap-2"
            >
            Logout
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        </motion.button>
    </div>
</motion.div>

                <div className="min-h-screen flex flex-col w-full max-w-5xl mx-auto dark:bg-gray-900 p-6 gap-3 "
                style={{maxHeight: "80vh"}}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col flex-grow w-full max-w-6xl mx-auto p-6 dark:bg-gray-900 bg-violet-100  rounded-lg overflow-y-auto space-y-4 mt-10 "
                    style={{ maxHeight: "70vh" }}
                >
                    {messages.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dark:text-gray-300 text-3xl text-black"
                        >
                            <div className="flex flex-row text-3xl justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-6xl font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-purple-600 dark:to-pink-300 bg-clip-text text-transparent p-3">Hello {user.name},</h1>
                                    <h1 className="text-6xl text-gray-600 dark:text-gray-500 p-3">How can I help you today ?</h1>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3 items-center mt-10">
                            <button 
                                    className="text-left"
                                    onClick={() => clickbutton("What are the various scholarships in IIITA and how to avail them?")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300  dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                        What are the various scholarships in IIITA and how to avail them?
                                    </div>
                                </button>
                                <button 
                                    className="text-left"
                                    onClick={() => clickbutton("I have lost my Id-card how to proceed further?")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300 dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                        I have lost my Id-card how to proceed further?
                                    </div>
                                </button>
                                <button 
                                    className="text-left"
                                    onClick={() => clickbutton("What is competitive programming?")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300 dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                        What is competitive programming?
                                    </div>
                                </button>
                                <button 
                                    className="text-left"
                                    onClick={() => clickbutton("Suggest me some youtube channels for DSA")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300 dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                     Suggest me some youtube channels for DSA
                                    </div>
                                </button>
                                
                                   
                            </div>
                            
                                
                                
                        </motion.p>
                    ) : (
                        messages.map((message, index) => (
                            <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: index * 0.1 }}
    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
>
<div
    className={`max-w-lg p-4 rounded-3xl  ${
        message.sender === "user"
            ? "bg-gradient-to-r from-white to-white text-black"
            : "bg-violet-600 text-white dark:bg-gray-800  dark:text-white"
    }`}
>
    {/* Only show the SVG if the sender is not the user */}
    {message.sender !== "user" && (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bot-message-square mb-2"
        >
            <path d="M12 6V2H8" />
            <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
            <path d="M2 12h2" />
            <path d="M9 11v2" />
            <path d="M15 11v2" />
            <path d="M20 12h2" />
        </svg>
    )}

    {message.sender === "user" ? (
        message.text
    ) : (
        <pre className="whitespace-pre-wrap bg-white bg-clip-text text-transparent"
        style={{ fontFamily:"sans-serif", fontSize: "1.1rem" }}
        >
            {message.text}
        </pre>
    )}
</div>

</motion.div>

                        ))
                    )}
                </motion.div>

                {/* Input Area */}
                <motion.form
                    onSubmit={handleSend}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-5xl mx-auto flex items-center space-x-3 p-2 bg-violet-200 dark:bg-gray-900 "
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-4 text-lg bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-100"
                        placeholder="Give a prompt..."
  
                    />  
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading && !iscomp} // Disable button while loading
                        className="bg-gradient-to-t from-blue-600 to-purple-600 p-3 rounded-full shadow-lg text-white flex items-center justify-center"
                    >
                        {loading ? (
                            <Loader className='w-6 h-6 animate-spin mx-auto' /> 
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up">
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19V5" />
                            </svg>
                        )}
                    </motion.button>
                </motion.form>
                </div> 
            </div>
        </>
    );
};

export default ChatPage;
