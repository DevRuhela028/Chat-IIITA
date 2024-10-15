import React from "react";
import { Link } from "react-router-dom";
import FloatingShape from "../FloatingShape";
function About() {
    return (
        <div className="min-h-[800px] flex flex-col justify-center items-center bg-white  dark:bg-gray-900">
            <FloatingShape color='bg-violet-500 dark:bg-violet-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-purple-500 dark:bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-blue-500 dark:bg-blue-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />
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
                        <li className="mt-6  text-xl">
                        This project involves developing an AI chatbot using Retrieval-Augmented Generation (RAG) pipelines, leveraging open-source Large Language Models (LLMs) such as Mistral-7B. The chatbot will be trained on comprehensive data from the college to assist students by answering their questions and providing pertinent information.
                        </li>
                        <li className="mt-4 text-xl ">
                        A user-friendly AI chatbot that significantly improves the accessibility of college information.
                        Enhanced onboarding experience for new students, reducing the workload on administrative staff.
                        Better-informed students who can easily find guidance on academic and extracurricular activities.

                        </li>
                        </ul>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default About