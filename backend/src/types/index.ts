import WebSocket from "ws";

export interface User {
  id: string;
  email: string;
  fullname: string;
  profilePic: string;
}

export interface CustomWebSocket extends WebSocket {
  isAlive: boolean;
  userId?: string;
}
