import ConversationList from "./ConversationList.jsx";
import LogoutButton from "./LogoutButton.jsx";
import SearchInput from "./SearchInput.jsx";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-2 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<ConversationList />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;
