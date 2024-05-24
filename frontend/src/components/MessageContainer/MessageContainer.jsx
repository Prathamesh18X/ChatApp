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
import { useSocketContext } from "../../Context/socketContext";

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
  const { selectedMenu, openChats, setOpenChats } = useMenu();
  const profileInfoModal = document.getElementById("profile-info-modal");

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const [hideSpan, setHideSpan] = useState(false);

  useEffect(() => {
    if (selectedConversation) {
      setHideSpan(false);
      const timer = setTimeout(() => {
        setHideSpan(true);
      }, 3500);
      
    }

    // Cleanup function to clear the timer
  }, [selectedConversation]);

  if(selectedConversation){
    const {onlineUsers} = useSocketContext();
    var isOnline = onlineUsers.includes(selectedConversation._id) ? "online" : "";
  }
  const lastSeen= () => {
    const now = new Date();
    const randomMinutes = Math.floor(Math.random() * 1440); // 1440 minutes in a day
    const randomTime = new Date(now.getTime() - randomMinutes * 60000);

    const hours = randomTime.getHours();
    const minutes = randomTime.getMinutes();

    const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const period = hours >= 12 ? 'PM' : 'AM';
    const day = hours > now.getHours() ? 'yesterday' : 'today';


    return `${day} at ${formattedHours}:${formattedMinutes} ${period}`;
}

const lastSeenTime = lastSeen();

  switch (selectedMenu) {
    case "Chats":
      return (
        <div
          className={`${
            openChats ? "" : "max-md:hidden"
          }  flex flex-grow flex-col w-auto my-2`}
        >
          {!selectedConversation ? (
            <NoChatSelected />
          ) : (
            <>
              <div className="flex justify-between bg-slate-500 dark:bg-slate-700 px-4 py-2 mb-2">
                <div className="flex ">
                  <button
                    className="md:hidden  gap-2 "
                    onClick={() => {
                      setSelectedConversation(null);
                      setOpenChats(false);
                    }}
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
                    <span
                      onClick={() => profileInfoModal.showModal()}
                      className=" cursor-pointer text-lg font-bold"
                    >
                      {selectedConversation.userName}
                    </span>
                    {!hideSpan ? (
                      <span className="text-[12px] opacity-100 transition-opacity duration-300 ease-in-out">
                        Select contact to view info
                      </span>
                    ) : (
                      <span className={`text-[12px] opacity-100 transition-opacity ${isOnline ? "text-green-300" : ""}  duration-300 ease-in-out`}>
                        {isOnline ? `🟢online` : `last seen ${lastSeenTime}` }
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center text-gray-900 dark:text-gray-200  mx-2 md:mx-5">
                  <ChatOptions />
                </div>
              </div>
              <ProfileInfoModal info={selectedConversation} />

              <ChatSection />
              <MessageInput />
            </>
          )}
        </div>
      );

    case "Groups":
      return (
        <div
          className={`${
            openChats ? "" : "max-md:hidden"
          } flex flex-grow flex-col w-auto my-2`}
        >
          {!selectedGroup ? (
            <NoChatSelected />
          ) : (
            <>
              <div className="flex bg-slate-500 px-4 py-2 mb-2">
                <button
                  className="md:hidden  gap-2 "
                  onClick={() => {
                    setSelectedConversation(null);
                    setOpenChats(false);
                  }}
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
                  <span
                    /*onClick={() => profileInfoModal.showModal()}*/ className=" cursor-pointer text-lg font-bold"
                  >
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
      return <GeminiChatArea />;
    default:
      break;
  }
};

export default MessageContainer;
