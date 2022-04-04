import React, { useContext } from "react";
import { Context } from "../../context";
export const UsersBar = () => {
  const { onlineUsers } = useContext(Context);
  return (
    <div className='users-bar'>
      <h2>Online</h2>
      <ul className='users-list'>
        {onlineUsers &&
          onlineUsers.map((user, index) => {
            return (
              <li key={index}>
                <img src={user.image_url} alt={user.name} />
                <span className='users-list-username'>{`${user.username}`}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
