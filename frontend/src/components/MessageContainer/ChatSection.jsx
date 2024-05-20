import { useEffect, useRef, useMemo } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import useGetGroupMessages from "../../hooks/useGetGroupMessages.js";
import { useMenu } from "../../zustand/useMenu.js";
import Message from "./Message.jsx";
import useListenMessages from "../../hooks/useListenMessage.jsx";

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ChatSection = () => {
  const { messages, loading } = useGetMessages();
  const { groupMessages, loading: groupLoading } = useGetGroupMessages();
  const { selectedMenu } = useMenu();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, groupMessages]);

  // Sender list
  const senderList = [];
  for (let i = 0; i < groupMessages.length; i++) {
    if (!senderList.includes(groupMessages[i].senderId)) {
      senderList.push(groupMessages[i].senderId);
    }
  }

  const colors = [
    "bg-gradient-to-r from-rose-400 to-rose-700 bg-clip-text inline-block text-transparent", // Rose gradient
    "bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text inline-block text-transparent", // Orange gradient
    "bg-gradient-to-r from-amber-400 to-amber-700 bg-clip-text inline-block text-transparent", // Amber gradient
    "bg-gradient-to-r from-lime-400 to-lime-700 bg-clip-text inline-block text-transparent", // Lime gradient
    "bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text inline-block text-transparent", // Blue gradient
    "bg-gradient-to-r from-indigo-400 to-indigo-700 bg-clip-text inline-block text-transparent", // Indigo gradient
    "bg-gradient-to-r from-pink-400 to-pink-700 bg-clip-text inline-block text-transparent", // Pink gradient
  ];

  const senderColorMapping = useMemo(() => {
    const mapping = {};
    senderList.forEach((senderId) => {
      if (!(senderId in mapping)) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        mapping[senderId] = randomColor;
      }
    });
    return mapping;
  }, [senderList]);

  const renderMessages = (messages, isGroup) => {
    let lastDate = null;
    return messages.map((message, index) => {
      const messageDate = new Date(message.createdAt);
      const messageDay = messageDate.toDateString();
      const showDate = lastDate !== messageDay;
      lastDate = messageDay;

      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center my-2 text-gray-500">
              {formatDate(message.createdAt)}
            </div>
          )}
          <div ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} color={isGroup ? senderColorMapping : undefined} />
          </div>
        </div>
      );
    });
  };

  switch (selectedMenu) {
    case "Chats":
      return (
        <div className="px-2 flex-1 w-full overflow-auto">
          {!loading && renderMessages(messages, false)}
          {!loading && messages.length === 0 && (
            <p className="text-center over">
              Send a message to start the conversation
            </p>
          )}
        </div>
      );
    case "Groups":
      return (
        <div className="px-2 flex-1 w-full overflow-auto">
          {!groupLoading && renderMessages(groupMessages, true)}
          {!groupLoading && groupMessages.length === 0 && (
            <p className="text-center">
              Send a message to start the conversation
            </p>
          )}
        </div>
      );
    case "AI Bot":
      return (
        <div className="px-2 flex-1 w-full overflow-auto">
          {!groupLoading && renderMessages(groupMessages, true)}
          {!groupLoading && groupMessages.length === 0 && (
            <p className="text-center">
              Send a message to start the conversation
            </p>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default ChatSection;
