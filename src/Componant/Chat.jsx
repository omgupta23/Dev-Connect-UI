import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BASE_URL from "../utils/constant";
import { socket } from "../socket"; // ✅ fixed typo

const Chat = () => {
  const { userId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState(null);
  const bottomRef = useRef(null); // ✅ for auto-scroll

  const loggedInUser = useSelector((store) => store.user);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Join socket room
  useEffect(() => {
    if (loggedInUser?._id) {
      socket.emit("joinChat", loggedInUser._id);
    }
  }, [loggedInUser]);

  // Listen for new messages
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + userId, {
        withCredentials: true,
      });
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  const fetchReceiver = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/" + userId, {
        withCredentials: true,
      });
      setReceiver(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchMessages();
    fetchReceiver();
  }, [fetchMessages, fetchReceiver]);

  const sendMessage = async () => {
    try {
      if (!text.trim()) return;

      await axios.post(
        BASE_URL + "/chat/send",
        { receiverId: userId, text },
        { withCredentials: true },
      );

      socket.emit("sendMessage", {
        senderId: loggedInUser._id,
        receiverId: userId,
        text,
      });

      setText(""); // ✅ socket's receiveMessage will add to state, no duplicate
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[90vh] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center gap-3">
        <img
          src={receiver?.photoUrl || "/default-avatar.png"} // ✅ fallback
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold">
            {receiver?.firstName} {receiver?.lastName}
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`flex mb-2 ${
              msg.senderId === loggedInUser?._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs ${
                msg.senderId === loggedInUser?._id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} /> {/* ✅ auto-scroll anchor */}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
