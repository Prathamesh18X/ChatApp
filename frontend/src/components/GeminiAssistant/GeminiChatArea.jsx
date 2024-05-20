import React ,{ useState  } from "react";
import MessageInput from "../MessageContainer/MessageInput.jsx";
import { useAuth } from "../../Context/AuthContext";
import { useGemini } from "../../Context/GeminiContext.jsx";
import { PromptAndResponse } from "./PromptAndResponse.jsx";

const GeminiChatArea = () => {
  const { authUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const { onSent, loading ,recentPrompt, previousPrompt, showResult, resultData } = useGemini().geminiValue;

  return (
    <div className="max-md:h-[86vh] flex flex-col w-full">
      {/*body*/}
      {showResult ? (
        <div className="flex flex-col flex-grow overflow-auto m-3">
            <PromptAndResponse/>
        </div>
      
      ) : (
        <div className="flex flex-col flex-grow justify-center items-center overflow-auto  m-3">
          <div className="text-6xl max-tablet:text-3xl font-bold bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Hello, {authUser.userName} <br />
            <span className="font-thin">How can I help you today?</span>
          </div>
        </div>
      )}

      {/*inputBox*/}
      <div>
        <MessageInput />
      </div>
    </div>
  );
};

export default GeminiChatArea;


/*
  import React from "react";
import MessageInput from "../MessageContainer/MessageInput.jsx";
import { useAuth } from "../../Context/AuthContext";
import { useGemini } from "../../Context/GeminiContext.jsx";
import PromptAndResponse from "./PromptAndResponse.jsx";

const GeminiChatArea = () => {
  const { authUser } = useAuth();
  const { onSent, loading, showResult, conversation } = useGemini().geminiValue;
  

  return (
    <div className="flex flex-grow flex-col">
      {showResult ? (
        <div className="flex flex-grow flex-col overflow-auto m-3">
          {conversation.map((item, index) => (
            <PromptAndResponse key={index} conversation={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-grow  justify-center items-center m-3">
          <div className="text-6xl font-bold">
            Hello, {authUser.userName} <br />
            <span className="font-thin">How can I help you today?</span>
          </div>
        </div>
      )}

      <div>
        <MessageInput />
      </div>
    </div>
  );
};

export default GeminiChatArea;

*/