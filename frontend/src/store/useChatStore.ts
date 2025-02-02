import { axiosInstance } from "@/lib/axios";
import { ChatStore } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand"
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/messages/users")
            set({ users: res.data })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        } finally {
            set({ isMessageLoading: false })
        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?.id}`, messageData)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        }
    },

    subscribeToMessages: async () => {
        const socket = useAuthStore.getState().socket
        if (!socket) return;

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)

                if (data.type === "newMessage") {
                    const { selectedUser, messages } = get()

                    if (
                        data.message.senderId === selectedUser?.id ||
                        data.message.receiverId === selectedUser?.id
                    ) {
                        set({ messages: [...messages, data.message] })
                    }

                    if (data.type === "getOnlineUsers" && data.userIds) {
                        useAuthStore.setState({ onlineUsers: data.userIds })
                    }
                }
            } catch (error) {
                console.error("Error parsing message: ", error)
            }
        }
    },

    unSubscribeFromMessages: async () => {
        const socket = useAuthStore.getState().socket;

        if (socket) {
            socket.onmessage = null;
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser: null })

}))