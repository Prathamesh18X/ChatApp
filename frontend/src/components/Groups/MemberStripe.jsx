import React from "react";
import { useConversation } from "../../zustand/useConversation";
import { useAuth } from "../../Context/AuthContext.jsx";

export const MemberStripe = ({ conversation }) => {
    const { selectedParticipants, setSelectedParticipants } = useConversation();
    const { authUser } = useAuth();
    const currentUserId = authUser._id;

    const isSelected = selectedParticipants.includes(conversation._id);

    const handleSelect = () => {
        if (isSelected) {
            setSelectedParticipants(selectedParticipants.filter((id) => id !== conversation._id));
        } else {
            const updatedParticipants = [...selectedParticipants, conversation._id];

            if (!updatedParticipants.includes(currentUserId)) {
                updatedParticipants.push(currentUserId);
            }

            setSelectedParticipants(updatedParticipants);
        }
    };

    return (
        <div
            className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer 
                ${isSelected ? "bg-green-300" : ""}`}
            onClick={handleSelect}
        >
            <div>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isSelected}
                    readOnly
                />
            </div>
            <div className={`avatar`}>
                <div className="w-9 rounded-full">
                    <img src={conversation.profilePic} alt="user avatar" />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex flex-col gap- justify-between">
                    <p className="font-bold text-md text-gray-700 dark:text-gray-300">
                        {conversation.fullName}
                    </p>
                </div>
            </div>
        </div>
    );
};
