import React, { useState } from "react";
import moment from "moment";
import "./Chat.css";

function Chat({ currentUser, messages, sendMessage, typingStatus, onTyping }) {
  const [newMessage, setNewMessage] = useState("");

  // Function to group messages by day
  const groupMessagesByDay = (messages) => {
    const groupedMessages = {};

    messages.forEach((msg) => {
      const messageDate = moment(msg.createdAt)
        .startOf("day")
        .format("YYYY-MM-DD");

      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = [];
      }
      groupedMessages[messageDate].push(msg);
    });

    return groupedMessages;
  };

  // Get the label for each day (Today, Yesterday, or a formatted date)
  const getDayLabel = (date) => {
    const now = moment();
    const messageDate = moment(date);

    if (messageDate.isSame(now, "day")) {
      return "Today";
    } else if (messageDate.isSame(now.subtract(1, "days"), "day")) {
      return "Yesterday";
    } else {
      return messageDate.format("MMMM Do");
    }
  };

  // Handle sending a new message
  const handleSend = () => {
    if (newMessage.trim() !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const groupedMessages = groupMessagesByDay(messages);

  return (
    <div className="chat-container">
      <div className="messages">
        {Object.keys(groupedMessages).map((date, index) => (
          <div key={index}>
            {/* Day Label */}
            <div className="day-label">{getDayLabel(date)}</div>

            {/* Messages for this day */}
            {groupedMessages[date].map((msg, i) => (
              <div
                key={i}
                className={`message ${
                  msg.senderId === currentUser ? "sent" : "received"
                }`}
              >
                <span className="message-text">{msg.content}</span>
                <div className="message-meta">
                  <span>{moment(msg.createdAt).format("h:mm A")}</span>
                  {msg.senderId === currentUser && (
                    <ReadReceipt status={msg.status} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {typingStatus && (
        <div className="typing-indicator">User is typing...</div>
      )}

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            onTyping();
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

// Read Receipt Component
const ReadReceipt = ({ status }) => {
  if (status === "read") return <span className="read-receipt read">✓✓</span>;
  if (status === "delivered")
    return <span className="read-receipt delivered">✓✓</span>;
  return <span className="read-receipt sent">✓</span>;
};

export default Chat;
