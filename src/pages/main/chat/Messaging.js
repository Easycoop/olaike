import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useGetMessages } from "../../../redux/actions/messageAction";
import { useParams } from "react-router-dom";

export const BASE_URL_SOCKET = process.env.REACT_APP_BASE_URL_SOCKET;

const socket = io(BASE_URL_SOCKET);

const MessagingFeature = () => {
  const getMessages = useGetMessages();
  const typingTimeoutRef = useRef(null);
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
      socket.off("notTyping");

      // Add the listeners
      socket.on("directMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("typing", () => {
        setTypingStatus(true);
      });

      socket.on("notTyping", () => {
        console.log("reaching here");
        setTypingStatus(false);
      });

      // Clean up when the component unmounts
      return () => {
        socket.off("directMessage");
        socket.off("typing");
        socket.off("notTyping");
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
    socket.emit("notTyping", {
      recipientId: id,
    });
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleTyping = () => {
    socket.emit("typing", {
      recipientId: id,
    });

    // Clear previous timeout and set a new one to stop typing
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setTypingStatus(false);
      socket.emit("notTyping", {
        recipientId: id,
      }); // Emit stop typing event
    }, 500); // Typing stops after 1 second of inactivity
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
