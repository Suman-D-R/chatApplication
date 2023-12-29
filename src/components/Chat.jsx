import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState("");
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("accessToken");

  const [socket, setSocket] = useState(null);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  useEffect(() => {
    setSocket(io("http://localhost:3020"));
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages when the socket is available
      socket.on("message", (receivedMessage) => {
        // Update local state with the received message
        setMessages([...messages, receivedMessage]);
      });
    }
  }, [socket, messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        const response = await axios.post(
          `http://localhost:3020/api/v1/message/`,
          {
            data: {
              conversationId: conversationId,
              senderId: userId,
              message: newMessage,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Emit the new message to the server
        socket.emit("message", {
          conversationId,
          senderId: userId,
          message: newMessage,
        });

        console.log(response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setNewMessage("");
    }
  };

  useEffect(() => {
    const fetchConversationId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3020/api/v1/conversation/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);

        setConversationId(response.data.data.conversationId);
      } catch (error) {
        console.error("Error fetching conversation ID:", error);
      }
    };

    fetchConversationId();
  }, [userId, token]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3020/api/v1/message/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);

        const fetchedMessages = response.data.data;
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [conversationId, token]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "500px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", marginBottom: "10px" }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                padding: "5px",
                borderBottom: "1px solid #eee",
                textAlign: message.senderId === userId ? "right" : "left", // Align right for sent messages, left for received
              }}
            >
              <strong>{message.senderId}: </strong>
              {message.message}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Type your message..."
            style={{ flex: 1, marginRight: "10px", padding: "5px" }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
