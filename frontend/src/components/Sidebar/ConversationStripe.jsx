import React from "react";
import {useConversation} from "../../zustand/useConversation";
import { useSocketContext } from "../../Context/socketContext";
import ImageModal from "../Modals/ImageModal";
const ConversationStripe = ({ conversation, lastIdx }) => {
  const {selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id) ? "online" : "";
  const modal = document.getElementById("image-modal");
  const profilePic = selectedConversation?.profilePic;
  // console.log(profilePic);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-200 dark:hover:bg-sky-700 rounded p-2 py-1 cursor-pointer 
		${isSelected ? "bg-sky-300 dark:bg-sky-900" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline}`}>
          <div className="w-12 rounded-full">
            <img onClick={() => modal.showModal()} src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex  flex-col gap- justify-between">
            <p className="font-bold text-md text-gray-700 dark:text-gray-300">{conversation.fullName}</p>
            <p className='text-[12px] text-gray-500'>{isOnline ? "online" : null}</p>
            {/* or
						MessageCount */}
          </div>
        </div>
      </div>
      <ImageModal image={profilePic} />

      {!lastIdx && <div className=" my-0 py-0 h-1" />}
    </>
  );
};

export default ConversationStripe;
