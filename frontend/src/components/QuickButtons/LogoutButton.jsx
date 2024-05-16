import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto '>
			{!loading ? (
				<button onClick={logout} className="btn btn-sm btn-error border-none "><BiLogOut className='w-6 h-6  cursor-pointer' /> Logout</button>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;