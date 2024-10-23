import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useGetMessages } from "../../../redux/actions/messageAction";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

const MessagingFeature = () => {
  const getMessages = useGetMessages();
  const { user } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const currentUser = user.id;
  const { id } = useParams();

  const handleGetMessages = async () => {
    try {
      const response = await getMessages({
        userId1: user.id,
        userId2: id,
      });

      if (
        response?.payload.status === 200 ||
        response?.payload.status === "success"
      ) {
        setErrorMessage("");
        // console.log("banny", response.payload.data);
        setMessages(response.payload.data);
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
    }
  };

  useEffect(() => {
    handleGetMessages();
  }, []);

  useEffect(() => {
    if (user && socket) {
      // Register the user once
      socket.emit("register", user.id);

      // Ensure listeners are removed before adding new ones
      socket.off("directMessage");
      socket.off("typing");
      socket.off("stop-typing");

      // Add the listeners
      socket.on("directMessage", (message) => {
        console.log("new message", message);
        setMessages((prev) => [...prev, message]);
      });

      socket.on("typing", () => {
        setTypingStatus(true);
      });

      socket.on("stop-typing", () => {
        setTypingStatus(false);
      });

      // Clean up when the component unmounts
      return () => {
        socket.off("directMessage");
        socket.off("typing");
        socket.off("stop-typing");
      };
    }
  }, [user, socket]);

  const sendMessage = (text) => {
    const newMessage = {
      senderId: currentUser,
      content: text,
      createdAt: new Date(),
      status: "sent",
    };
    socket.emit("sendDirectMessage", {
      senderId: user.id,
      recipientId: id,
      content: text,
    });
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleTyping = () => {
    socket.emit("typing");
  };

  return (
    <Chat
      currentUser={currentUser}
      messages={messages}
      sendMessage={sendMessage}
      typingStatus={typingStatus}
      onTyping={handleTyping}
    />
  );
};

export default MessagingFeature;
