import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useMenu } from "../zustand/useMenu";

const convertToHourMinute = (timeString) => {
  const date = new Date(timeString);
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  hour = hour.toString().padStart(2, "0");
  return `${hour}:${minute} ${period}`;
};

const Message = ({ message, color }) => {
  const { authUser } = useAuth();
  const { selectedMenu } = useMenu();
  const messageTime = convertToHourMinute(message.createdAt);
  //
  if (selectedMenu === "Groups") {
    var senderName =
      message.senderId !== authUser._id ? message.senderUserName : null;
    var senderColor = color[message.senderId];
  }

  const chatClassName =
    selectedMenu === "Groups"
      ? message.senderId === authUser._id
        ? "chat p-[1px] chat-end"
        : "chat p-[1px] chat-start"
      : message.senderId === authUser._id
      ? "chat p-[1px] chat-end"
      : "chat p-[1px] chat-start";

  const chatBubbleClassName =
    message.senderId === authUser._id ? "bg-black-100" : "bg-black-500";

  return (
    <div className={chatClassName}>
      <div className="chat-image avatar"></div>
      <div
        className={`chat-bubble px-5 py-2 justify-center items-start rounded-lg flex flex-col ${chatBubbleClassName}`}
      >
        {selectedMenu === "Groups" && (
          <div className={`text-[12px] font-bold ${senderColor}`}>
            {senderName}
          </div>
        )}
        <div className="max-sm:text-sm text-white text-sm pr-8 ">
          {message.message}
        </div>
        <div className=" text-[9px] absolute bottom-[1px] right-2  gap-1 align-text-bottom">
          {messageTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
