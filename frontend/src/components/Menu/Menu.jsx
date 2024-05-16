import React from "react";
import { useMenu } from "../../zustand/useMenu.js";
import { BsChatLeftTextFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaWandMagicSparkles } from "react-icons/fa6";

import ThemeBtn from "../QuickButtons/ThemeBtn.jsx";
import ProfileModal from "../Modals/ProfileModal.jsx";

const Menu = () => {
  const { selectedMenu, setSelectedMenu } = useMenu();

  const handleChatClick = () => {
    setSelectedMenu("Chats");
  };
  const handleAiClick = () => {
    setSelectedMenu("ChatApp AI");
  };

  const handleGroupClick = () => {
    setSelectedMenu("Groups");
  };
  const handleCommunityClick = () => {
    setSelectedMenu("Community");
  };
  return (
    <div className="flex flex-grow-0 flex-col h-full justify-between py-5">
      {/* Top Section - Chat Buttons */}
      <div className="flex flex-col space-y-2">
        {/* <div className="px-4 text-black">
          <img src="./public/ChatApp.svg" alt="not found"  />
        </div> */}
        <button className="p-2">
          <img src="./public/ChatApp.svg" alt="not found" className="w-10" />
          <span className="relative bottom-2 text-[10px] text-[#0086cd] dark:text-gray-300 font-bold"> {/*logo*/}
            ChatApp
          </span>
        </button>
        <button
          className={`${
            selectedMenu === "Chats"
              ? "bg-white dark:bg-slate-700"
              : "bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer  flex justify-center text-center text-black dark:text-gray-300 `}
          onClick={handleChatClick}
        >
          <BsChatLeftTextFill className="h-5 w-5" />
        </button>
        <button
          className={`${
            selectedMenu === "ChatApp AI"
              ? "bg-white dark:bg-slate-700"
              : "bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer  flex justify-center text-center text-black dark:text-gray-300 `}
          onClick={handleAiClick}
        >
          <div className="flex gap-1 font-bold text-[12px] items-center"><FaWandMagicSparkles className="h-5 w-5" /><div>AI</div></div>
        </button>
        <button
          className={`${
            selectedMenu === "Groups"
              ? "bg-white dark:bg-slate-700"
              : "bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer flex justify-center text-center text-black  dark:text-gray-300  `}
          onClick={handleGroupClick}
        >
          <FaUserGroup className="h-5 w-5" />
        </button>
        <button
          className={`${
            selectedMenu === "Community"
              ? "bg-white dark:bg-slate-700"
              : "bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer flex justify-center text-center text-black  dark:text-gray-300  `}
          onClick={handleCommunityClick}
        >
          <HiUserGroup className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Section - Logout and Theme Buttons */}
      <div className="flex flex-col text-black dark:text-gray-300  items-center space-y-4">
        <ThemeBtn />
        <IoSettingsSharp
          className="h-6 w-6 cursor-pointer"
          onClick={() => document.getElementById("profileModal").showModal()}
        />
        <ProfileModal />
      </div>
    </div>
  );
};

export default Menu;
