import React from "react";
import ConversationStripe from "./ConversationStripe";
import useGetConversations from "../../hooks/useGetConversation";
import { useMenu } from "../../zustand/useMenu";
import {MemberStripe} from "../Groups/MemberStripe";

const ConversationList = () => {
  const { loading, conversations } = useGetConversations();
  const { createGroupModal } = useMenu();
  
  //   console.log("conversation with : ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        createGroupModal ? (
          <MemberStripe
            key={conversation._id}
            conversation={conversation}
          />
        ) : (
          <ConversationStripe
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        )
      ))}

      {loading && (
        <span className="loading loading-spinner mx-auto"></span>
      )}
    </div>
  );
};

export default ConversationList;

/*
import React from "react";
import ConversationStripe from "./ConversationStripe";
import useGetConversations from "../hooks/useGetConversations";
import MemberStripe from "./Groups/MemberStripe";
import { useMenu } from "../zustand/useMenu";

const ConversationList = () => {
  const { loading, conversations } = useGetConversations();
  const { isGroupModalOpen } = useMenu();

  return (
    <div className="py-2 flex flex-col w-full overflow-auto">
      {conversations.map((conversation, idx) => (
        isGroupModalOpen ? (
          <MemberStripe
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ) : (
          <ConversationStripe
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        )
      ))}

      {loading && (
        <span className="loading loading-spinner mx-auto"></span>
      )}
    </div>
  );
};

export default ConversationList;

*/
