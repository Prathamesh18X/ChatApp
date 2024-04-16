import React from "react";
import { useAuth } from "../Context/AuthContext";
import useConversation from "../zustand/useConversation";

const convertToHourMinute = (timeString) => {
  const date = new Date(timeString);
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  hour = hour.toString().padStart(2, "0");
  return `${hour}:${minute} ${period}`;
};
const Message = ({ message }) => {
  const { authUser } = useAuth();
  const { selectedConversation } = useConversation();
  const chatClassName =
    message.senderId === authUser._id ? "chat chat-end" : "chat chat-start";
  const messageTime = convertToHourMinute(message.createdAt);
  const profilePic =
    message.senderId === authUser._id
      ? authUser.profilePic
      : selectedConversation.profilePic;

const chatBubbleClassName = message.senderId === authUser._id ? "bg-black-100" : "bg-gray-500";
  return (
    <div className={`chat p-[2px] ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble flex flex-col ${chatBubbleClassName} pb-1`}>
        <span className="text-white text-sm pr-12">{message.message}</span>
        <span className="chat-footer text-[10px] flex gap-1 justify-end">
          {messageTime}
        </span>
      </div>
    </div>
  );
};

export default Message;
