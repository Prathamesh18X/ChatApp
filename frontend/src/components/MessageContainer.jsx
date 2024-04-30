import React, { useEffect } from "react";
import MessageInput from "./MessageInput.jsx";
import ChatSection from "./ChatSection.jsx";
import { TiMessages } from "react-icons/ti";
import { useConversation } from "../zustand/useConversation";
import { useMenu } from "../zustand/useMenu";
import { useGroup } from "../zustand/useGroup.js";
import { useAuth } from "../Context/AuthContext.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";

const NoChatSelected = () => {
  const { authUser } = useAuth();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl w-full text-black font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { selectedMenu } = useMenu();
  const { selectedGroup , setSelectedGroup } = useGroup();

  //to unmount last selected user after logout
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

   switch (selectedMenu) {
    case "Chats":
      return ( <div
        className={`${selectedConversation ? "flex flex-col sm:w-full my-2" : "sm:w-5/6 max-sm:hidden"}`} >
        {!selectedConversation ? (
            <NoChatSelected />
        ) : (
          <>
            <div className="flex bg-slate-500 px-4 py-2 mb-2">
              <button
                className="sm:hidden  gap-2 "
                onClick={() => setSelectedConversation(null)}
              >
                <IoMdArrowRoundBack className="h-5 w-5" />
              </button>
              <div className="w-10 rounded-full px-2">
                <img
                  alt="pic not found"
                  src={selectedConversation.profilePic}
                />
              </div>
              <span className="text-gray-900 font-bold">
                {selectedConversation.userName}
              </span>
            </div>
          
            <ChatSection />
            <MessageInput />
          </>
        )}
      </div>)

    case "Groups":
      return ( <div
        className={`${selectedGroup ? "flex flex-col sm:w-full my-2" : "sm:w-5/6 max-sm:hidden"}`} >
        {!selectedGroup ? (
            <NoChatSelected />
        ) : (
          <>
            <div className="flex bg-slate-500 px-4 py-2 mb-2">
              <button
                className="sm:hidden  gap-2 "
                onClick={() => setSelectedGroup(null)}
              >
                <IoMdArrowRoundBack className="h-5 w-5" />
              </button>
              <div className="w-10 rounded-full px-2">
                {/* <img
                  alt="Tailwind CSS chat h-10 w-10 bubble component"
                  src=""
                /> */}
              </div>
              <span className="text-gray-900 font-bold">
                {selectedGroup.name}
              </span>
            </div>
          
            <ChatSection />
            <MessageInput />
          </>
        )}
      </div>)
   
    default:
      break;
   }
};

export default MessageContainer;
