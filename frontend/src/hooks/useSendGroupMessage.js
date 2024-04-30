import { useState } from "react";
import {useGroup} from "../zustand/useGroup.js";
import toast from "react-hot-toast";

const useSendGroupMessage = () => {
	const [loading, setLoading] = useState(false);
	const { groupMessages, setGroupMessages, selectedGroup } = useGroup();

	const sendGroupMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/groups/send/${selectedGroup._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setGroupMessages([...groupMessages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendGroupMessage, loading };
};
export default useSendGroupMessage;