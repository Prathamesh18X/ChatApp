import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null, // initial value null
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [], // initial value empty array
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;