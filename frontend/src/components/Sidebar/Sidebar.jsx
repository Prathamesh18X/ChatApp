import ConversationList from "./ConversationList.jsx";
import SearchInput from "./SearchInput.jsx";
import { useConversation } from "../../zustand/useConversation";
import { useMenu } from "../../zustand/useMenu.js";
import GroupList from "../Groups/GroupList.jsx";
import History from "../GeminiAssistant/History.jsx";
import { IoSettingsSharp } from "react-icons/io5";
import ProfileModal from "../Modals/ProfileModal.jsx";
import ThemeBtn from "../QuickButtons/ThemeBtn.jsx";

const Sidebar = () => {
    const { selectedMenu, openChats } = useMenu();
  return (
    <div
      className={`${selectedMenu === "ChatApp AI" ? "max-md:hidden" : ""} ${openChats ? "max-md:hidden" : "w-full"} max-sm:h-[85vh] md:w-1/3 tablet:w-1/4 border-slate-500 p-2 my-2 bg-white rounded-b-lg rounded-l-lg  flex flex-col dark:bg-slate-700`}
    >
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold  text-black dark:text-white p-2">
        {selectedMenu}
      </h1>
      {/* <div className={`md:hidden gap-2 flex justify-center items-center text-black dark:text-gray-300  items-center space-y-4`}>
        <ThemeBtn />
        <IoSettingsSharp
          className="h-6 w-6 cursor-pointer"
          onClick={() => document.getElementById("profileModal").showModal()}
        />
        <ProfileModal />
      </div> */}

      </div>
      {selectedMenu === "ChatApp AI" ? <History /> : <SearchInput />}

      {selectedMenu === "Chats" ? <ConversationList /> : null}
      {selectedMenu === "Groups" ? <GroupList /> : null}
      {selectedMenu === "Community" ? <div className="text-center text-lg"> comming Soon... </div> : null}
    </div>
  );
};
export default Sidebar;
