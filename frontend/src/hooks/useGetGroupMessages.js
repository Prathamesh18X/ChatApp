import { useEffect, useState } from "react";
import {useGroup} from "../zustand/useGroup";
import toast from "react-hot-toast";

const useGetGroupMessages = () => {
	const [loading, setLoading] = useState(false);
	const { groupMessages, setGroupMessages, selectedGroup } = useGroup();

	useEffect(() => {
		const getGroupMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/groups/${selectedGroup._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setGroupMessages(data);
				
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedGroup?._id) getGroupMessages();
	}, [selectedGroup?._id, setGroupMessages]);

	return { groupMessages, loading };
};
export default useGetGroupMessages;