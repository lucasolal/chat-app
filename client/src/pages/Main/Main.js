import React from "react";
import { TopBar, ChannelList, MessageBox, UsersBar } from "../../components";

export const Main = () => {
  return (
    <div className='top-container'>
      <TopBar></TopBar>
      <main className='main-container'>
        <ChannelList></ChannelList>
        <MessageBox></MessageBox>
        <UsersBar></UsersBar>
      </main>
    </div>
  );
};
