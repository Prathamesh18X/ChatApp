import React, { useState, useEffect } from "react";
import MessageInput from "./MessageInput.jsx";
import ChatSection from "./ChatSection.jsx";
import { TiMessages } from "react-icons/ti";
import { useConversation } from "../../zustand/useConversation";
import { useMenu } from "../../zustand/useMenu";
import { useGroup } from "../../zustand/useGroup.js";
import { useAuth } from "../../Context/AuthContext.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import ProfileInfoModal from "../Modals/ProfileInfoModal.jsx";
import ChatOptions from "../Menu/ChatOptions.jsx";
import GeminiChatArea from "../GeminiAssistant/GeminiChatArea.jsx";

const NoChatSelected = () => {
  const { authUser } = useAuth();
  return (
    <div className="flex flex-grow p-2 items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl w-full text-black dark:text-gray-300  font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-4xl text-center" />
      </div>
      </div>
  );
};

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { selectedGroup, setSelectedGroup } = useGroup();
  const { selectedMenu ,openChats, setOpenChats } = useMenu();
  const profileInfoModal = document.getElementById("profile-info-modal");

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const [hideSpan, setHideSpan] = useState(false);

  useEffect(() => {
    if(selectedConversation) {
      setHideSpan(false)
      const timer = setTimeout(() => {
        setHideSpan(true);
      }, 3500);
      return () => clearTimeout(timer);
    }

    // Cleanup function to clear the timer
  }, [selectedConversation]);

  switch (selectedMenu) {
    case "Chats":
      return (
        <div className={`${openChats ? "" : "max-md:hidden"}  flex flex-grow flex-col w-auto my-2`}>
          {!selectedConversation ? (
            <NoChatSelected/>
            
          ) : (
            <>
              <div className="flex justify-between bg-white dark:bg-slate-700 px-4 py-2 mb-2">
                <div className="flex ">
                <button
                  className="md:hidden  gap-2 "
                  onClick={() => {setSelectedConversation(null); setOpenChats(false);}}
                >
                  <IoMdArrowRoundBack className="h-5 w-5" />
                </button>
                <div className="px-2">
                  <img
                    alt="pic not found"
                    onClick={() => profileInfoModal.showModal()}
                    className="w-12 h-12 rounded-full cursor-pointer object-cover"
                    src={selectedConversation.profilePic}
                    
                  />
                </div>
                <div className=" flex flex-col justify-center text-gray-900 dark:text-gray-300 ">
                  <span onClick={() => profileInfoModal.showModal()} className=" cursor-pointer text-lg font-bold">
                    {selectedConversation.userName}
                  </span>
                  {!hideSpan && (
                    <span className="text-[12px] opacity-100 transition-opacity duration-300 ease-in-out">
                      Select contact to view info
                    </span>
                  )}
                </div>
                </div>
                <div className="flex justify-center items-center mx-6">
                <ChatOptions />
                </div>
              </div>
              <ProfileInfoModal info={selectedConversation}/>

              <ChatSection />
              <MessageInput />
            </>
          )}
        </div>
      );

    case "Groups":
      return (
        <div
        className={`${openChats ? "" : "max-md:hidden"} flex flex-grow flex-col w-auto my-2`}>
          {!selectedGroup ? (
            <NoChatSelected />
          ) : (
            <>
              <div className="flex bg-slate-500 px-4 py-2 mb-2">
                <button
                  className="md:hidden  gap-2 "
                  onClick={() => {setSelectedConversation(null); setOpenChats(false);}}
                >
                  <IoMdArrowRoundBack className="h-5 w-5" />
                </button>
                <div className="p-2">
                  <img
                    alt="pic not found"
                    className="w-12 h-12 rounded-full"
                    src={selectedGroup.groupPic}
                  />
                </div>
                <div className=" flex flex-col justify-center text-gray-900 ">
                  <span /*onClick={() => profileInfoModal.showModal()}*/ className=" cursor-pointer text-lg font-bold">
                    {selectedGroup.name}
                  </span>
                  {!hideSpan && (
                    <span className="text-[12px] opacity-100 transition-opacity duration-300 ease-in-out">
                      {selectedGroup.participants.length} Participants
                    </span>
                  )}
                </div>
              </div>

              <ChatSection />
              <MessageInput />
            </>
          )}
        </div>
      );
      case "ChatApp AI":
        return(
            <GeminiChatArea/>
        )
    default:
      break;
  }
};

export default MessageContainer;
