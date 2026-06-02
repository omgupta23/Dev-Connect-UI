import React, { useEffect } from "react";
import { socket } from "../soket";

const Chat = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });
  }, []);
  return <div>Chat app</div>;
};

export default Chat;
