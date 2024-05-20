import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import { useGemini } from "../../Context/GeminiContext.jsx";

const History = () => {
  const { loading, recentPrompt, resultData, setShowResult,showResult, previousPrompt } =
    useGemini().geminiValue;
  return (
    <div className={`max-md:hidden flex flex-col px-2`}>
      <span className="relative bottom-3 font-semibold text-[12px] text-[#0086cd]">
        Assistant
      </span>
      <div className="m-2">
        <button onClick={() => setShowResult(setShowResult(false))} className="btn btn-ghost rounded-full bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 text-white btn-primary">
          New chat
        </button>
      </div>
      <div className="m-2 text-gray-900 dark:text-gray-300">{previousPrompt.length == 0 ? "No History" : "Recents"}</div>
      {previousPrompt ? (
        previousPrompt.slice().reverse().map((recentPrompt, index) => (
          <div className="flex items-center gap-2 m-2">
          <div>
            <FaRegMessage />
          </div>
          <div className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
            {recentPrompt}
          </div>
        </div>
        )) 
      ) : (
        null
      )}
    </div>
  );
};

export default History;
