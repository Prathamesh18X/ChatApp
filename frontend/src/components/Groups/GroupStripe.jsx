import React from "react";
import {useGroup} from "../../zustand/useGroup.js";
// import { useSocketContext } from "../Context/socketContext";
const GroupsStripe = ({ group, /*lastIdx*/ }) => {
  const {selectedGroup, setSelectedGroup } = useGroup();
  const isSelected = selectedGroup?._id === group._id;
  // const {onlineUsers} = useSocketContext();
  // const isOnline = onlineUsers.includes(Groups._id) ? "online" : "";
  return (  
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-400 rounded p-2 py-1 cursor-pointer 
		${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedGroup(group)}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src={group.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex  flex-col gap- justify-between">
            <p className="font-bold text-gray-500">{group.name}</p>
            {/* <p className='text-sm'>{isOnline ? "Online" : null}</p> */}
            {/* or MessageCount */}
          </div>
        </div>
      </div>

      {/* {!lastIdx && <div className="divider my-0 py-0 h-1" />} */}
    </>
  );
};

export default GroupsStripe;
