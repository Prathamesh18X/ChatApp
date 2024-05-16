import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import  useSendMessage  from "../../hooks/useSendMessage";
import useSendGroupMessage from "../../hooks/useSendGroupMessage";
import { useMenu } from "../../zustand/useMenu";
import { useGemini } from "../../Context/GeminiContext";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading: chatLoading, sendMessage } = useSendMessage();
  const { loading: groupLoading, sendGroupMessage } = useSendGroupMessage();
  const { onSent , showResult , resultData, loading ,recentPrompt} = useGemini().geminiValue;
  const { selectedMenu } = useMenu();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    switch (selectedMenu) {
      case "Chats":
        sendMessage(message);
        break;
      case "Groups":
        sendGroupMessage(message);
        break;
      case "Community":
        //function
        break;
      case "ChatApp AI":
        onSent(message);
        break;
      default:
        break;
    }
    
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3 flex justify-center items-center gap-2">
      <div className="flex w-[90%] items-center input input-bordered rounded-full ">
        <input
          type="text"
          className="grow"
          placeholder="Send a message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" className=" w-5 h-5 outline-none">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
