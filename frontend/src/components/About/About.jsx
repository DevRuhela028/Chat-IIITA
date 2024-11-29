import React from "react";
import { Target, CheckCircle, Cpu, List ,User} from "lucide-react";


function About() {
    return (
        <div className="min-h-screen flex flex-col gap-10 items-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 p-8">
            <div className="container m-auto px-6 text-gray-800 dark:text-gray-300 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center justify-center lg:gap-12">
                    <div className="md:w-1/2 lg:w-1/3">
                        <img
                            src="vecteezy_3d-artificial-intelligence-chatbot-orange-on-transparent_45548962.png"
                            alt="image"
                            className="rounded-2xl w-full h-auto"
                        />
                    </div>

                    <div className="md:7/12 lg:w-6/12">
                        <p className="text-5xl font-medium text-violet-700 dark:text-violet-500">
                        LLM-Based AI Chatbot for College Assistance
                        </p>
                        <ul>
                        <li className="mt-6 text-gray-700 dark:text-gray-300 text-xl">
                        This project involves developing an AI chatbot using Retrieval-Augmented Generation (RAG) pipelines, leveraging open-source Large Language Models (LLMs) such as Llama-3.1-70b. The chatbot will be trained on comprehensive data from the college to assist students by answering their questions and providing pertinent information.
                        </li>
                        <li className="mt-4 text-gray-700 dark:text-gray-300 text-xl ">
                        A user-friendly AI chatbot that significantly improves the accessibility of college information.
                        Enhanced onboarding experience for new students, reducing the workload on administrative staff.
                        Better-informed students who can easily find guidance on academic and extracurricular activities.

                        </li>
                        </ul>
                        
                        
                    </div>
                    
                </div>
                
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl mb-10">
                {/* Goals and Objectives Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4">
                        <CheckCircle /> Goals and Objectives
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                        <li>Provide instant and accurate responses to student queries.</li>
                        <li>Facilitate easy access to information about college activities and academic structure.</li>
                        <li>Enhance onboarding for freshers by addressing common questions and concerns.</li>
                        <li>Offer guidance and roadmaps for technology fields.</li>
                    </ul>
                </div>

                {/* Target Audience Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                        <Target /> Target Audience
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                        <li>College students, especially freshers.</li>
                        <li>Prospective students interested in college details.</li>
                        <li>College administration and faculty for internal communication.</li>
                    </ul>
                </div>

                {/* Features and Functionality Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-4">
                        <Cpu /> Features and Functionality
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                        <li>Answers queries on course details and academic structure.</li>
                        <li>Provides faculty office timings and contact information.</li>
                        <li>Guides students to facilities like the swimming pool.</li>
                        <li>Explains the administrative hierarchy of the college.</li>
                        <li>Offers roadmaps and resources for various tech fields.</li>
                        <li>Supports both text-based interactions.</li>
                    </ul>
                   
                </div>

                {/* Technologies Used Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-600 dark:text-red-400 mb-4">
                        <List /> Technologies Used
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                        <li><strong>FAISS:</strong> Facebook AI Similarity Search, a library used for efficient similarity search and clustering of dense vectors.</li>
                        <li><strong>llama-3.1-70b-versatile:</strong> For natural language understanding and generation.</li>
                        <li><strong>Python:</strong> The primary programming language of chatbot.</li>
                        <li><strong>MERN Stack:</strong> For creating an interactive user interface and backend.</li>
                    </ul>
                </div>

                {/* Expected Outcomes Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-4">
                        <CheckCircle /> Expected Outcomes
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
                        <li>A user-friendly AI chatbot that improves college information accessibility.</li>
                        <li>Enhanced onboarding experience for new students.</li>
                        <li>Better-informed students with easy guidance on academics and activities.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;
