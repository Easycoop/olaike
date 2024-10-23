import { useEffect, useState } from "react";
import "./select-chat.css";
import { useGetAllMessages } from "../../../redux/actions/messageAction";
import { useGetUsers } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SelectChat() {
  const getUsers = useGetUsers();
  const getAllMessages = useGetAllMessages();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userResult, setUserResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Jordan" },
    { id: 4, name: "Serena Williams" },
  ]);

  // Dummy data for chat conversations
  const dummyChats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey! How are you?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Let's meet tomorrow",
      timestamp: "9:15 AM",
    },
    {
      id: 3,
      name: "Work Group",
      lastMessage: "Meeting postponed.",
      timestamp: "8:00 AM",
    },
    {
      id: 4,
      name: "Family",
      lastMessage: "Dinner at 7?",
      timestamp: "Yesterday",
    },
  ];

  // Filter chats based on search term
  const filteredChats = dummyChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ChatItem = ({ chat }) => {
    return (
      <div className="chat-item">
        <div className="chat-details">
          <h2 className="chat-name">{chat.name}</h2>
          <p className="last-message">{chat.lastMessage}</p>
        </div>
        <div className="chat-timestamp">
          <span>{chat.timestamp}</span>
        </div>
      </div>
    );
  };

  const NewChatDropdown = ({ contacts }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const excludedContacts = contacts.filter(
      (contact) => contact.id != user.id
    );

    // Filter contacts based on the search term
    const filteredContacts = excludedContacts.filter((contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="new-chat-dropdown">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="contact-search-input"
        />
        <ul className="contact-list">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className="contact-item"
              onClick={() => navigate(`/main/message-user/${contact.id}`)}
            >
              {`${contact.firstName} ${contact.lastName}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleGetAllMessages = async () => {
    try {
      const response = await getAllMessages();

      if (
        response?.payload.status === 200 ||
        response?.payload.status === "success"
      ) {
        setErrorMessage("");
        console.log("helen", response.payload.data);
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

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      if (response?.payload.success === true) {
        setErrorMessage("");
        setUserResult(response.payload.data.result);
        console.log("bennyta", response.payload.data.result);
        return;
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllMessages();
    handleGetUsers();
  }, []);

  return (
    <div className="select-chat">
      <header className="chat-header">
        <h1 className="app-title">Conversations</h1>
        <div className="new-chat-wrapper">
          <button className="new-chat-btn" onClick={toggleDropdown}>
            New Chat
          </button>
          {isDropdownOpen && <NewChatDropdown contacts={userResult} />}
        </div>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search chat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="chat-list">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
        ) : (
          <p className="no-chats-message">No chats found</p>
        )}
      </div>
    </div>
  );
}

export default SelectChat;
