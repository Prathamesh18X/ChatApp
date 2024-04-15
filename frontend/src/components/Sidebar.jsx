import ConversationList from "./ConversationList";
// import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-2 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<ConversationList />
			{/* <LogoutButton /> */}
		</div>
	);
};
export default Sidebar;
