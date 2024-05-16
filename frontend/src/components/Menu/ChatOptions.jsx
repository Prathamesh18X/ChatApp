import React, { useState, useEffect } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { useConversation } from "../../zustand/useConversation";
import ProfileInfoModal from "../Modals/ProfileInfoModal";
import { ImBlocked } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdReport } from "react-icons/md";
import toast from 'react-hot-toast';

const ChatOptions = () => {
  const { selectedConversation } = useConversation();
  const [blocked, setBlocked] = useState();
  const profileInfoModal = document.getElementById("profile-info-modal");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/block/${selectedConversation._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();
        setBlocked(user.isBlocked);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchData();
  }, [selectedConversation._id]);

  const handleClearChats = async () => {
    try {
      const res = await fetch(`/api/messages/clear/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      toast.success(data.message);
    } catch (error) {
      console.error("Error clearing chats:", error);
    }
  };

  const handleBlockChat = async () => {
    try {
      const res = await fetch(`/api/users/block/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setBlocked(data.isBlocked);
      toast.success(data.message);
    } catch (error) {
      console.error("Error blocking chat:", error);
    }
  };
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="mx-6 m-4"><SlOptionsVertical className="cursor-pointer" /></div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow text-gray-800 bg-white rounded-box w-64 ">
        <li><div onClick={() => profileInfoModal.showModal()}> <MdAccountCircle  className='w-5 h-5'/> View Profile</div></li>
        <li><div onClick={handleClearChats}><MdDeleteForever className='w-5 h-5' />Delete Chats for everyone</div></li>
        <li><div><MdReport  className='w-5 h-5' />Report</div></li>
        <li><div onClick={handleBlockChat} className='text-rose-500'><ImBlocked />{blocked ? "Unblock" : "Block"} User</div></li>
      </ul>
      <ProfileInfoModal info={selectedConversation}/>
    </div>
  );
};

export default ChatOptions;
