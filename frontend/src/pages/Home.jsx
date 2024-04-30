import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import MessageContainer from "../components/MessageContainer.jsx";
import Menu from "../components/Menu.jsx";

const Home = () => {

  return (
    <div className="flex sm:h-full h-full w-full rounded-lg overflow-hidden border-2 shadow-lg bg-clip-padding bg-slate-300 dark:bg-slate-900">
      <Menu/>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
