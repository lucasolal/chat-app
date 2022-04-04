import { useAuth0 } from "@auth0/auth0-react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";

export const Login = () => {
  const { socket, userId, setUserId } = useContext(Context);
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, socket, userId, isAuthenticated, navigate, setUserId]);

  return <></>;
};
