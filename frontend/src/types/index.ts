import { ReactNode } from "react";

export interface ChildrenProps {
    children: ReactNode
}

export interface User {
    id: string;
    email: string;
    fullname: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string
}

export interface UserRegisterData {
    email: string;
    fullname: string;
    password: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}

export interface AuthState {
    authUser: User | null;
    isRegistering: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isChecking: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
    socket: null | WebSocket;
    register: (data: UserRegisterData) => Promise<void>;
    login: (data: UserLoginData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    updateProfile: (data: { profilePic: string }) => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    text?: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    sender: User;
    receiver: User;
}

export interface ChatState {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
}

export interface ChatStore {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    getUsers: () => Promise<void>;
    getMessages: (userId: string) => Promise<void>;
    sendMessage: (data: {
        text?: string,
        image?: string | ArrayBuffer | null
    }) => Promise<void>;
    setSelectedUser: (selectedUser: User | null) => void;
    subscribeToMessages: () => void;
    unSubscribeFromMessages: () => void;
}