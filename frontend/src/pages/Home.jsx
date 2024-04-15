import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import MessageContainer from "../components/MessageContainer.jsx";

const Home = () => {
  return (
    <div className="flex sm:h-full md:h-full w-full rounded-lg overflow-hidden border-2 shadow-lg bg-clip-padding bg-white">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
