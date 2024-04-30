
import { useEffect } from "react";

import { useSocketContext } from "../Context/socketContext";
import {useConversation} from "../zustand/useConversation";
import {useGroup} from "../zustand/useGroup";
// import notificationSound from "../assets/notificationSound.mp3";


const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();
	const { groupMessages, setGroupMessages } = useGroup();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
			setMessages([...messages, newMessage]);
		});

		socket?.on("newGroupMessage", (newGroupMessage) => {
			setGroupMessages([...groupMessages, newGroupMessage]);
		})

		return () => {
		socket?.off("newMessage");
		socket?.off("newGroupMessage");
	};
		
	}, [socket, setMessages, messages, setGroupMessages, groupMessages]);
};
export default useListenMessages;
