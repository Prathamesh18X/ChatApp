import React, { useState} from "react";
import ConversationList from "../Sidebar/ConversationList.jsx";
import { IoIosClose } from "react-icons/io";
import { useConversation } from "../../zustand/useConversation";
import { useMenu } from "../../zustand/useMenu";
import toast from "react-hot-toast";

const GroupModal =()=> {
    // console.log("create group modal");

    const [groupName, setGroupName] = useState("");
    const [groupPic, setGroupPic] = useState(null);
    const [groupPicUrl, setGroupPicUrl] = useState(null);
    const { selectedParticipants, setSelectedParticipants } = useConversation();
    const { setCreateGroupModal } = useMenu();
    const modal = document.getElementById("create-group");
    

    const handleCreateGroup = async () => {
        if (!groupName) {
            toast.error("Please enter a group name");
            return;
        }
        if(selectedParticipants.length < 2) {
            toast.error("Please select at least one participant");
        }
        
        const formData = new FormData();
        formData.append("name", groupName);
        formData.append("participants", JSON.stringify(selectedParticipants));
        
        if (groupPic) {
            formData.append("groupPic", groupPic);
        }

        try {
            const response = await fetch("/api/groups/create", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Group created successfully!");
                // Reset state and close the modal
                setGroupName("");
                setGroupPic(null);
                setGroupPicUrl(null);
                setSelectedParticipants([]);
                setCreateGroupModal(false);
                modal.close();
            } else {
                const errorData = await response.json();
                toast.error(`Error creating group: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error making request:", error);
            toast.error("An error occurred while creating the group.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGroupPic(file);
            setGroupPicUrl(URL.createObjectURL(file));
        }
    };

        // const handleKeydown = (event) => {
        //     if(event.key === 'Escape'){ 
        //         modal.close();
        //         setCreateGroupModal(false);
        //     }
        // }
        // document.addEventListener("keydown", handleKeydown);

    const handleCloseModal = () => {
        setGroupName("");
        setGroupPic(null);
        setGroupPicUrl(null);
        setSelectedParticipants([]);
        setCreateGroupModal(false);
        modal.close();
    };

    return (
        <dialog id="create-group" className="fixed modal inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white  rounded-lg p-6 w-96 relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={handleCloseModal}
                >
                    <IoIosClose className="h-7 w-7" />
                </button>
                <h2 className="text-xl font-bold my-4">Create a New Group</h2>
                <div className="flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="input input-bordered w-full my-2"
                    />
                    <label htmlFor="groupPic" className="w-20 h-20 m-2">
                        <img
                            src={
                                groupPicUrl || "https://i.postimg.cc/NFg3dp7z/group-Image.png"
                            }
                            className="w-20 h-20 rounded-full cursor-pointer object-cover"
                            alt=""
                        />
                        <input
                            id="groupPic"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div className="participants-list mb-4">
                    <ConversationList />
                </div>
                <div className="flex justify-between">
                    <button className="btn btn-ghost" onClick={handleCloseModal}>
                        Cancel
                    </button>
                    <button
                        className="btn text-slate-500 hover:bg-green-600 bg-green-500 border-none rounded-xl"
                        onClick={handleCreateGroup}
                    >
                        Create
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default GroupModal;
