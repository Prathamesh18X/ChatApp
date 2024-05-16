import React, { useEffect, useState } from "react";
import GroupStripe from "./GroupStripe";
import { FiEdit } from "react-icons/fi";
import useGetGroups from "../../hooks/useGetGroups.js";
import GroupModal from "../Modals/CreateGroupModal.jsx";
import { useMenu } from "../../zustand/useMenu";
import { useSocketContext } from "../../Context/socketContext";

const GroupList = () => {
  // console.log("group list");
  const { loading, groups } = useGetGroups();
  const { setCreateGroupModal } = useMenu();
  const [updatedGroups, setUpdatedGroups] = useState(groups);
  const { socket } = useSocketContext();
  const modal = document.getElementById('create-group');


  const handleCreateGroupClick = () => {
    modal.showModal();
    setCreateGroupModal(true);
  };

  useEffect(() => {
    setUpdatedGroups(groups);
  }, [groups]);

  useEffect(() => {
    const handleNewGroupCreated = (newGroup) => {
      setUpdatedGroups((prevGroups) => [...prevGroups, newGroup]);
    };

    socket.on("newGroupCreated", handleNewGroupCreated);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("newGroupCreated", handleNewGroupCreated);
    };
  }, [socket]);

  return (
    <>
      <div className="flex w-full text-black font-bold dark:text-gray-300 justify-between items-center py-2">
        <div>
          Total ({updatedGroups.length})
        </div>
        <button
          className="btn btn-sm text-slate-800 h-1 hover:bg-green-600 bg-green-500 border-none rounded-3xl"
          onClick={handleCreateGroupClick}
        >
          Create Group
          <FiEdit className="h-4 w-4 font-bold" />
        </button>
      </div>

      {/* List of groups */}
      <div className="py-2 flex flex-col w-full overflow-auto">
        {updatedGroups.length > 0  && !loading ? (
          updatedGroups.map((group) => (
            <GroupStripe
              key={group._id}
              group={group}
            />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <div className="text-center">Not a Participant in any Group</div>
          </div>
        )}
        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : null}
      </div>

      <GroupModal />
    </>
  );
};

export default GroupList;
