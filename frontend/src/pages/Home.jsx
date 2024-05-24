import React from "react";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import MessageContainer from "../components/MessageContainer/MessageContainer.jsx";
import Menu from "../components/Menu/Menu.jsx";
import useListenMessages from "../hooks/useListenMessage.jsx";

const Home = () => {

  useListenMessages();

  return (
    <div className="flex sm:h-full h-full w-full rounded-lg overflow-hidden border-4 shadow-lg bg-clip-padding bg-blue-200 dark:bg-slate-900">
      <Menu/>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
