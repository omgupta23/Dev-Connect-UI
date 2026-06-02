import { io } from "socket.io-client";
import BASE_URL from "./utils/constant";

export const socket = io(BASE_URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Socket Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("Socket Error:", err.message);
});
