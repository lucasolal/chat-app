import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from "../../context";

export const InputBox = ({ scrollToEnd, setScrollOnFetch }) => {
  const { socket } = useContext(Context);
  const [message, setMessage] = useState("");
  const { user, isAuthenticated } = useAuth0();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message) return;
    socket.emit("sendingMessage", message, user.sub, user.name);
    setMessage("");
    setScrollOnFetch();
  };

  return (
    <div className='input-box-container'>
      <textarea
        name=''
        id='input-text'
        cols='100'
        maxLength='500'
        value={message}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleSend} disabled={!isAuthenticated}>
        Send
      </button>
    </div>
  );
};
