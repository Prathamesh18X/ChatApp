import ConversationList from "./ConversationList.jsx";
import SearchInput from "./SearchInput.jsx";
import { useConversation } from "../../zustand/useConversation";
import { useMenu } from "../../zustand/useMenu.js";
import GroupList from "../Groups/GroupList.jsx";
import History from "../GeminiAssistant/History.jsx";

const Sidebar = () => {
    const { selectedMenu } = useMenu();
  return (
    <div
      className={` w-1/4 border-slate-500 p-2 my-2 bg-white rounded-b-lg rounded-l-lg  flex flex-col dark:bg-slate-700`}
    >
      <h1 className="text-2xl font-bold  text-black dark:text-white p-2">
        {selectedMenu}
      </h1>
      {selectedMenu === "ChatApp AI" ? <History /> : <SearchInput />}

      {selectedMenu === "Chats" ? <ConversationList /> : null}
      {selectedMenu === "Groups" ? <GroupList /> : null}
      {selectedMenu === "Community" ? <div className="text-center text-lg"> comming Soon... </div> : null}
    </div>
  );
};
export default Sidebar;
