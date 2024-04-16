import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import  useSendMessage  from "../hooks/useSendMessage";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3 flex items-center gap-2">
      <div className="flex w-[70%] items-center input input-bordered ">
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
