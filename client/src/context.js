import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
export const Context = React.createContext();

const socket = io(process.env.REACT_APP_SERVER_URL);

export const AppProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user)
      socket.emit("login", user.sub, user.name, user.picture);
  }, [isAuthenticated, user]);

  useEffect(() => {
    socket.on("updateUsers", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  return (
    <Context.Provider value={{ socket, onlineUsers, setUserId, userId }}>
      {children}
    </Context.Provider>
  );
};
