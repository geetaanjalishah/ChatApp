import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";

export const Chat = ({ room: initialRoom }) => {
  const [room, setRoom] = useState(initialRoom);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room, messagesRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    if (!auth.currentUser) {
      console.error("User not authenticated!");
      return;
    }
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };

  const handleEnterMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleRoomChange = (newRoom) => {
    setRoom(newRoom);
  };

  return (
    <div className="chatApp">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
        <div className="room-change">
          <label>Change Room:</label>
          <input value={room} onChange={(e) => handleRoomChange(e.target.value)} />
        </div>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div
            className={`message ${message.user === (auth.currentUser ? auth.currentUser.displayName : null) ? "user-message" : "received-message"}`}
            key={message.id}
          >
            <span className="user">{message.user === (auth.currentUser ? auth.currentUser.displayName : null) ? "You" : message.user}</span>: {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          onKeyDown={handleEnterMessage}
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};
