import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Context } from "../../context";

export const TopBar = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { socket } = useContext(Context);
  return (
    <nav className='top-menu'>
      <span className='app-title'></span>
      <div className='user-menu'>
        {user && isAuthenticated && (
          <>
            <img className='user-image' src={user.picture} alt='user profile' />
            <div className='user-name'>{user.name}</div>
          </>
        )}
        {!user && (
          <button
            onClick={() => {
              loginWithRedirect({
                redirectUri: process.env.REACT_APP_SERVER_URL,
              });
            }}
          >
            Log in
          </button>
        )}
        {user && isAuthenticated && (
          <button
            onClick={() => {
              logout({ returnTo: process.env.REACT_APP_SERVER_URL });
            }}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};
