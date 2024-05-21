import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../Context/socketContext";
import { useConversation } from "../zustand/useConversation";
import { useGroup } from "../zustand/useGroup";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { groupMessages, setGroupMessages } = useGroup();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages([...messages, newMessage]);
      console.log(newMessage);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {newMessage.senderUserName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {newMessage.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    };

    const handleNewGroupMessage = (newGroupMessage) => {
      setGroupMessages([...groupMessages, newGroupMessage]);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {newGroupMessage.senderName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {newGroupMessage.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
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