import { Context } from "../../context";
import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Logout = () => {
  const { socket, userId } = useContext(Context);
  const { logout } = useAuth0();
  useEffect(() => {
    console.log(userId);
    logout({ returnTo: process.env.REACT_APP_SERVER_URL });
  }, [logout, socket, userId]);
  return <></>;
};
