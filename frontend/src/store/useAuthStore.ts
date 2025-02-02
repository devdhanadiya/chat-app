import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthState, UserRegisterData, UserLoginData } from "@/types";

const BASE_URL = process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_WS_URL
    : "ws://localhost:8000/"

interface WebSocketMessage {
    type: string;
    userIds: string[];
}

export const useAuthStore = create<AuthState>((set, get) => ({
    authUser: null,
    onlineUsers: [],
    socket: null,
    isRegistering: false,
    isLogginIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isChecking: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    register: async (data: UserRegisterData) => {
        set({ isRegistering: true })
        try {
            const res = await axiosInstance.post("/auth/register", data)
            set({ authUser: res.data })
            get().connectSocket();
            toast.success("Account Created Successfully!")
        } catch (error: any) {
            set({ authUser: null })
            toast.error(error.response?.data.message || "Register Failed")
        } finally {
            set({ isRegistering: false })
        }
    },

    login: async (data: UserLoginData) => {
        set({ isLogginIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            get().connectSocket()
            toast.success("Logged in Successfully")
        } catch (error: any) {
            set({ authUser: null })
            toast.error(error.response?.data.message || "Login Failed")
        } finally {
            set({ isLogginIn: false })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            get().disconnectSocket()
            toast.success("Logged Out Successfully")
            window.location.href = "/login"
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Logout Failed")
            }
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("auth/update-profile", data)
            set({ authUser: res.data })
            toast.success("Profile Updated Successfully")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Error in Updating profile")
            }
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: async () => {
        const { authUser } = get();
        if (!authUser?.id) {
            return;
        }

        const wsUrl = `${BASE_URL}?userId=${authUser.id}`
        const newSocket = new WebSocket(wsUrl)

        newSocket.onopen = () => {
            set({ socket: newSocket })
            newSocket.send(JSON.stringify({ type: "getOnlineUsers" }))
        }

        newSocket.onmessage = (event) => {
            try {
                const data: WebSocketMessage = JSON.parse(event.data.toString())
                if (data.type === "getOnlineUsers" && data.userIds) {
                    set({ onlineUsers: data.userIds })
                }
            } catch (error) {
                console.error("Error parsing websocket message: ", error)
            }
        }

        newSocket.onerror = (error) => {
            console.error("Websocket error: ", error)
        }
    },

    disconnectSocket: async () => {
        const { socket } = get()
        if (socket) {
            socket.close()
            set({ socket: null })
        }
    }
}));