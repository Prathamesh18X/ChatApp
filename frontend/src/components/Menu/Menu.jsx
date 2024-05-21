import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../zustand/useMenu.js";
import { BsChatLeftTextFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaWandMagicSparkles } from "react-icons/fa6";
import ThemeBtn from "../QuickButtons/ThemeBtn.jsx";
import ProfileModal from "../Modals/ProfileModal.jsx";

const Menu = () => {
  const { selectedMenu, setSelectedMenu ,openChats} = useMenu();

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
    <div className={`${openChats ? "max-md:hidden" : ""} max-md:absolute max-md:bottom-0 max-md:py-2 max-md:bg-white flex max-md:w-full flex-row md:flex-grow-0 md:flex-col md:h-full md:justify-between py-5`}>
      {/* Top Section - Chat Buttons */}
      <div className="flex flex-row justify-around w-full md:flex-col space-y-2">
        {/* <div className="px-4 text-black">
          <img src="./public/ChatApp.svg" alt="not found"  />
        </div> */}
        <button className="flex-col justify-center items-center  p-2 flex max-md:hidden">
          <Link to="/">
          <div className=" font-bold text-[12px] ">
            <img
            src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716113819/Logo/rn4ihnpiptrahzc4pwg9.svg"
            alt="not found"
            className="w-10"
          />
          <span className=" bottom-2 text-[10px] text-[#0086cd] dark:text-gray-300 font-bold">
            {" "}
            ChatApp
          </span>
          </div>
          </Link>
        </button>
        <button
          className={`${
            selectedMenu === "Chats"
              ? "max-md:text-blue-600 md:bg-white dark:bg-slate-700"
              : "md:bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer   text-center text-black dark:text-gray-300 `}
          onClick={handleChatClick}
        >
          <div className="flex-col flex font-bold text-[12px] items-center">
            <BsChatLeftTextFill className="h-5 w-5" />
            <span>Chats</span>
          </div>
        </button>
        <button
          className={`${
            selectedMenu === "ChatApp AI"
              ? "max-md:text-blue-600 md:bg-white dark:bg-slate-700"
              : "md:bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer  flex justify-center text-center text-black dark:text-gray-300 `}
          onClick={handleAiClick}
        >
          <div className="flex flex-col font-bold text-[12px] items-center">
            <FaWandMagicSparkles className="h-5 w-5" />
            <span>AI assistant</span>
          </div>
        </button>
        <button
          className={`${
            selectedMenu === "Groups"
              ? "max-md:text-blue-600 md:bg-white dark:bg-slate-700"
              : "md:bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer flex justify-center text-center text-black  dark:text-gray-300  `}
          onClick={handleGroupClick}
        >
        <div className="flex flex-col font-bold text-[12px] items-center">
          <FaUserGroup className="h-5 w-5" />
          <span>Groups</span>
        </div>
        </button>
        <button
          className={`${
            selectedMenu === "Community"
              ? "max-md:text-blue-600 md:bg-white dark:bg-slate-700"
              : "md:bg-blue-200  dark:bg-slate-900"
          } p-3 rounded-l-xl cursor-pointer flex justify-center text-center text-black  dark:text-gray-300  `}
          onClick={handleCommunityClick}
        >
          <div className="flex flex-col font-bold text-[12px] items-center">
          <HiUserGroup className="h-5 w-5" />
          <span>Community</span>
          </div>
        </button>
      </div>

      {/* Bottom Section - Logout and Theme Buttons */}
      <div className="max-md:hidden flex flex-col text-black dark:text-gray-300  items-center space-y-4">
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
