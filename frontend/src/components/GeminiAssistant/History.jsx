import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import { useGemini } from "../../Context/GeminiContext.jsx";

const History = () => {
  const { loading, recentPrompt, resultData, setShowResult,showResult, previousPrompt } =
    useGemini().geminiValue;
  return (
    <div className="flex flex-col px-2">
      <span className="relative bottom-3 font-semibold text-[12px] text-[#0086cd]">
        Assistant
      </span>
      <div className="m-2">
        <button onClick={() => setShowResult(!showResult)} className="btn btn-ghost rounded-full bg-gray-400 text-white btn-primary">
          New chat
        </button>
      </div>
      <div className="m-2">{showResult ? "Recents" : "No History"}</div>
      {showResult ? (
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
