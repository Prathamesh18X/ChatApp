import React from "react";
import ConversationStripe from "./ConversationStripe";
import useGetConversations from "../hooks/useGetConversation";
const ConversationList = () => {
  const { loading, conversations } = useGetConversations();
  //   console.log("conversation with : ", conversations);
  return (
    <div className="py-2 flex flex-col w-full overflow-auto">
      {conversations.map((conversation, idx) => (
        <ConversationStripe
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversation.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default ConversationList;
