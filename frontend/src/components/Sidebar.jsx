import ConversationList from "./ConversationList.jsx";
import SearchInput from "./SearchInput.jsx";
import {useConversation} from "../zustand/useConversation";
import { useMenu } from "../zustand/useMenu.js";
import GroupList from "./Groups/GroupList.jsx";


const Sidebar = () => {
 const isMobile = window.innerWidth <= 768;
 const { selectedMenu } = useMenu();
const { selectedConversation } = useConversation();
	return (
		<div className={`${selectedConversation ? "max-sm:hidden" : ""} w-full sm:w-1/3  border-slate-500 p-2 my-2 bg-white rounded-lg flex flex-col dark:bg-slate-700`}>
			<h1 className="text-2xl font-bold  text-black dark:text-white p-2">{selectedMenu}</h1>
			<SearchInput />
			
			{selectedMenu === "Chats" ? (<ConversationList />) : null}
			{selectedMenu === "Groups" ? (<GroupList />) : null}
		</div>
	);
};
export default Sidebar;
