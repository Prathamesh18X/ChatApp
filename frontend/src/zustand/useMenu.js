import { create } from "zustand";

export const useMenu = create((set) => ({
    selectedMenu : "Chats",
	setSelectedMenu: (selectedMenu) => set({ selectedMenu }),
    createGroupModal : false,
    setCreateGroupModal: (createGroupModal) => set({ createGroupModal }),
    
}))