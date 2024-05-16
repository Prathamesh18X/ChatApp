import { createContext, useContext, useState } from "react";
import run from "../config/Gemini";

export const GeminiContext = createContext();

export const GeminiProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 25 * index);
  };

  const onSent = async (prompt) => {
    const formatResponse = (response) => {
      const boldPattern = /\*\*(.*?)\*\*/g;
      const headingPattern = /##\s*(.*?)\s*(?= |$)/g;
      const italicPattern = /\*(.*?)\*/g;
      const listItemPattern = /^- (.*?)(?=\n|$)/gm;
      const codeBlockPattern = /```([\s\S]*?)```/g;
  
      const handleCodeBlock = (match, p1) => {
          return `<pre><code>${p1}</code></pre>`;
      };
      let formattedResponse = response;
  
      formattedResponse = formattedResponse.replace(boldPattern, "<b>$1</b>");
      formattedResponse = formattedResponse.replace(headingPattern, "<h1>$1</h1>");
      formattedResponse = formattedResponse.replace(italicPattern, "<em>$1</em>");
      formattedResponse = formattedResponse.replace(listItemPattern, "<li>$1</li>");
      formattedResponse = formattedResponse.replace(/\n\s*\n/g, "</p><p>");
      formattedResponse = `<p>${formattedResponse}</p>`;
  
      formattedResponse = formattedResponse.replace(codeBlockPattern, handleCodeBlock);
  
      return formattedResponse;
  };
  

    console.log(prompt);

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setPreviousPrompt((prev) => [...prev, prompt]);

    const response = await run(prompt);

    const newResponse = formatResponse(response);
    const newResponseArr = newResponse.split(" ");
    for (let i = 0; i < newResponseArr.length; i++) {
      const nextWord = newResponseArr[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
  };

  const geminiValue = {
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompt,
    setPreviousPrompt,
    loading,
    setLoading,
    showResult,
    setShowResult,
    resultData,
    setResultData,
  };

  return (
    <GeminiContext.Provider value={{ geminiValue }}>
      {children}
    </GeminiContext.Provider>
  );
};

export const useGemini = () => {
  return useContext(GeminiContext);
};

//  import { createContext, useContext, useEffect, useState } from "react";
// import run from "../config/Gemini";

// export const GeminiContext = createContext();

// export const GeminiProvider = ({ children }) => {
//   const [input, setInput] = useState("");

//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [previousPrompt, setPreviousPrompt] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [resultData, setResultData] = useState("");

//   const [conversation, setConversation] = useState([]);

//   const delayPara = (index, nextWord) => {
//     setTimeout(() => {
//       setResultData(prev => prev + nextWord);
//     }, 25 * index);
//   };

//   const onSent = async (prompt) => {
//     const formatResponse = (response) => {
//       let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
//       formattedResponse = formattedResponse.replace(/##\s*(.*?)\s*(?= |$)/g, "<h1>$1</h1>");
//       formattedResponse = formattedResponse.replace(/\*(.*?)\*/g, "<em>$1</em>");
//       formattedResponse = formattedResponse.replace(/^- (.*?)(?=\n|$)/gm, "<li>$1</li>");
//       formattedResponse = formattedResponse.replace(/\n\s*\n/g, "</p><p>");
//       formattedResponse = formattedResponse.replace(/\*/g, "<br>");
//       formattedResponse = `<p>${formattedResponse}</p>`;
//       return formattedResponse;
//     };

//     console.log(prompt);

//     setResultData("");
//     setLoading(true);
//     setShowResult(true);
//     setRecentPrompt(prompt);
//     setPreviousPrompt(prev => [...prev, prompt]);

//     const response = await run(prompt);

//     const newResponse = formatResponse(response);
//     const newResponseArr = newResponse.split(" ");
//     for (let i = 0; i < newResponseArr.length; i++) {
//       const nextWord = newResponseArr[i];
//       delayPara(i, nextWord + " ");
//     }

//     setConversation(prev => [...prev, { prompt, response: newResponse }])

//     setLoading(false);

//   };

//   const geminiValue = {
//     onSent,input,setInput,recentPrompt,setRecentPrompt,previousPrompt,setPreviousPrompt,loading,setLoading,showResult,setShowResult,resultData,setResultData,conversation
//   };

//   return (
//     <GeminiContext.Provider value={{ geminiValue }}>
//       {children}
//     </GeminiContext.Provider>
//   );
// };

// export const useGemini = () => {
//   return useContext(GeminiContext);
// };
