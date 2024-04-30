import React from "react";
import { useMenu } from "../zustand/useMenu";
import { BsChatLeftTextFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi2";
import LogoutButton from "./LogoutButton";
import ThemeBtn from "./ThemeBtn";

const Menu = () => {
  const { selectedMenu ,setSelectedMenu } = useMenu();

  const handleChatClick = () => {
    setSelectedMenu("Chats"); 
  };

  const handleGroupClick = () => {
    setSelectedMenu("Groups");
  };
  return (
    <div className="flex flex-col h-full justify-between py-5">
      {/* Top Section - Chat Buttons */}
      <div className="flex flex-col space-y-2">
          <button className={`${selectedMenu === "Chats" ? "bg-white dark:bg-slate-700" : "bg-slate-300  dark:bg-slate-900"} p-3 rounded-l-xl cursor-pointer  flex justify-center text-center text-black dark:text-white  `} onClick={handleChatClick}>
            <BsChatLeftTextFill className="h-5 w-5" />
          </button>
          <button className={`${selectedMenu === "Groups" ? "bg-white dark:bg-slate-700" : "bg-slate-300  dark:bg-slate-900"} p-3 rounded-l-xl cursor-pointer flex justify-center text-center text-black  dark:text-white `} onClick={handleGroupClick}>
            <HiUserGroup className="h-5 w-5" />
          </button>
      </div>

      {/* Bottom Section - Logout and Theme Buttons */}
      <div className="flex flex-col items-center space-y-4">
        <ThemeBtn />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Menu;
