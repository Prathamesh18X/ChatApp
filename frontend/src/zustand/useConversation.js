import { create } from "zustand";

export const useConversation = create((set) => ({
	profilePic: null,
	setProfilePic: (profilePic) => set({ profilePic }),
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	selectedParticipants: [],
	setSelectedParticipants: (selectedParticipants) => set({ selectedParticipants }),
	
}));

