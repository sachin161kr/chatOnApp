import "./App.css";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("https://chat-on-server.vercel.app/");
//const username = nanoid(4);
const username = prompt("Enter uername");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, username });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatOn</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              <span>{payload.username}</span> : {payload.message}
            </p>
          );
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
