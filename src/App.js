import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { Cookies } from "react-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);


  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const handleEnterRoom = (e) => {
    if (e.key === 'Enter') {
      setRoom(roomInputRef.current.value);
    }
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} onKeyDown={handleEnterRoom} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
      <div className="header-buttons">
        <button className="sign-out" onClick={signUserOut}>Sign Out</button>
      </div>
      
    </>
  );
}

export default App;
