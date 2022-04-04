import React, { useContext, useEffect, useState, useRef } from "react";
import { InputBox } from "../InputBox";
import { Context } from "../../context";

export const MessageBox = () => {
  const { socket } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const messageBoxRef = useRef(null);
  const [scrollOnFetch, setScrollOnFetch] = useState(true);

  const scrollToEnd = () => {
    messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("sendingMessages", (messages) => {
      setMessages(messages);
      if (scrollOnFetch) {
        scrollToEnd();
        setScrollOnFetch(false);
      }
    });
    socket.emit("requestingMessages");
  }, []);

  return (
    <div className='message-box'>
      <div className='messages' ref={messageBoxRef}>
        {messages.map((msg, index) => {
          const processedMsg = msg.message.split("\n").map((message, index) => {
            return (
              <span key={index}>
                {message} <br />{" "}
              </span>
            );
          });

          return (
            <div className='message' key={index}>
              <div className='username'>{msg.username}</div>
              <div className='content'>{processedMsg}</div>
            </div>
          );
        })}
      </div>
      <InputBox
        scrollToEnd={scrollToEnd}
        setScrollOnFetch={setScrollOnFetch}
      ></InputBox>
    </div>
  );
};
