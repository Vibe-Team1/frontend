import { create } from "zustand";

const useGuestbookStore = create((set, get) => ({
  guestbooks: {},

  addMessage: (userId, message) => {
    set((state) => {
      const userMessages = state.guestbooks[userId] || [];
      return {
        guestbooks: {
          ...state.guestbooks,
          [userId]: [...userMessages, message],
        },
      };
    });
  },

  getAllMessages: (userId) => {
    const state = get();
    return state.guestbooks[userId] || [];
  },

  getRecentMessages: (userId) => {
    const state = get();
    const messages = state.guestbooks[userId] || [];
    return messages.slice(-3);
  },

  deleteMessage: (userId, messageId) => {
    set((state) => {
      const userMessages = state.guestbooks[userId] || [];
      return {
        guestbooks: {
          ...state.guestbooks,
          [userId]: userMessages.filter((msg) => msg.id !== messageId),
        },
      };
    });
  },
}));

export default useGuestbookStore;
