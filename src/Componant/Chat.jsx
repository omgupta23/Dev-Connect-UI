import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../utils/constant";

const Chat = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + userId, {
        withCredentials: true,
      });

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Chat hello</h1>

      {messages.map((msg) => (
        <p key={msg._id}>{msg.text}</p>
      ))}
    </div>
  );
};

export default Chat;
