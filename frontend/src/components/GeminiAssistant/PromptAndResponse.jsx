import React, { useState, useEffect } from 'react';
import { useGemini } from "../../Context/GeminiContext.jsx";
import { useAuth } from '../../Context/AuthContext.jsx';
import { SiGooglegemini } from "react-icons/si";


export const PromptAndResponse = () => {
    const { loading, recentPrompt, resultData } = useGemini().geminiValue;
    const { authUser } = useAuth();

    return (
        <>
          <div className="flex flex-col">
                    <div className="chat chat-end ">
                        <div><img src={authUser.profilePic} alt="" className='w-12 h-12 rounded-full m-2' /></div>
                        <p className="chat-bubble bg-slate-100 text-black px-8 mx-2 flex justify-center items-center">{recentPrompt}</p>
                    </div>
                    {loading ? (
                        <div className="chat chat-start p-0">
                        <div><SiGooglegemini className='text-4xl text-blue-500 animate-spin ' style={{ animationDuration: '2s' }} /></div>
                        <div className="chat-bubble bg-slate-100 text-black px-8 mx-2 flex justify-center items-center">
                            <span className="loading loading-dots loading-md"></span>
                        </div>
                    </div>
                      
                    ) : (
                        <div className="chat chat-start ">
                            <div className='text-blue-500'><SiGooglegemini className='text-4xl '/></div>
                            <p className="chat-bubble bg-slate-100 text-black px-8 mx-2" dangerouslySetInnerHTML={{ __html: resultData }}></p>
                        </div>
                    )}
                </div>
        </>
    );
};



/*
    import React, { useEffect, useState } from 'react';
import { useGemini } from '../../Context/GeminiContext';

const PromptAndResponse = ({ conversation }) => {
    const { recentPrompt, loading } = useGemini().geminiValue;
    const [showResponse, setShowResponse] = useState(true);

    useEffect(() => {
        setShowResponse(true); // Show response immediately when component mounts
    }, []);

    return (
        <div className="flex flex-col">
            <div className="chat chat-end p-0">
                <p className="chat-bubble bg-slate-100 text-black px-8 mx-2 flex justify-center items-center">{conversation.prompt}</p>
            </div>
            <div className="chat chat-start">
                {showResponse && (
                    <>
                        {loading && conversation.prompt === recentPrompt ? (
                            <div className="chat-bubble bg-slate-100 text-black px-8 mx-2 flex justify-center items-center"><span className="loading loading-dots loading-md"></span></div>
                        ) : (
                            <p className="chat-bubble bg-slate-100 text-black px-8 mx-2" dangerouslySetInnerHTML={{ __html: conversation.response }}></p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PromptAndResponse;

*/