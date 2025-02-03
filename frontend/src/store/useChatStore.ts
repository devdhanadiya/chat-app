import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { ChatStore } from "@/types";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";

const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser?.id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  },

  subscribeToMessages: async () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "newMessage") {
          const { selectedUser, messages } = get();

          if (
            data.message.senderId === selectedUser?.id ||
            data.message.receiverId === selectedUser?.id
          ) {
            set({ messages: [...messages, data.message] });
          }

          if (data.type === "getOnlineUsers" && data.userIds) {
            useAuthStore.setState({ onlineUsers: data.userIds });
          }
        }
      } catch (error) {
        console.error("Error parsing message: ", error);
      }
    };
  },

  unSubscribeFromMessages: async () => {
    const { socket } = useAuthStore.getState();

    if (socket) {
      socket.onmessage = null;
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

export default useChatStore;
