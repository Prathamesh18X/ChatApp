import { useEffect, useRef, useMemo } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import useGetGroupMessages from "../../hooks/useGetGroupMessages.js";
import { useMenu } from "../../zustand/useMenu.js";
import Message from "./Message.jsx";

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ChatSection = () => {
  const { messages, loading } = useGetMessages();
  const { groupMessages, loading: groupLoading } = useGetGroupMessages();
  const { selectedMenu } = useMenu();
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
    "text-rose-600", // Rose color
    "text-orange-600", // Orange color
    "text-amber-600", // Amber color
    "text-blue-600", // Blue color
    "text-indigo-600", // Indigo color
    "text-pink-600", // Pink color
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
            <div className="text-center my-2 text-gray-600">
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
