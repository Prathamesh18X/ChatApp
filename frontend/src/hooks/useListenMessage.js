import { useEffect } from "react";
import { useSocketContext } from "../Context/socketContext";
import { useConversation } from "../zustand/useConversation";
import { useGroup } from "../zustand/useGroup";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    const { groupMessages, setGroupMessages } = useGroup();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        };

        const handleNewGroupMessage = (newGroupMessage) => {
            setGroupMessages([...groupMessages, newGroupMessage]);
        };

        const handleChatCleared = () => {
            setMessages([]);
        };

        socket?.on("newMessage", handleNewMessage);
        socket?.on("newGroupMessage", handleNewGroupMessage);
        socket?.on("chatCleared", handleChatCleared);

        return () => {
            socket?.off("newMessage", handleNewMessage);
            socket?.off("newGroupMessage", handleNewGroupMessage);
            socket?.off("chatCleared", handleChatCleared);
        };
    }, [socket, setMessages, messages, setGroupMessages, groupMessages]);

    return null;
};

export default useListenMessages;
