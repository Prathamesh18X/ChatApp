import React from "react";
import {useGroup} from "../../zustand/useGroup.js";
import { useMenu } from "../../zustand/useMenu.js";
const GroupsStripe = ({ group }) => {
  const {selectedGroup, setSelectedGroup } = useGroup();
  const { openChats, setOpenChats } = useMenu();
  // console.log(group);
  const isSelected = selectedGroup?._id === group._id;

  return (  
    <>
      <div
        className={`flex gap-2 items-center  hover:bg-gray-200 hover:dark:bg-slate-600 rounded p-2 py-1 cursor-pointer 
		${isSelected ? "bg-blue-300 dark:bg-slate-900" : ""}`}
        onClick={() => {setSelectedGroup(group); setOpenChats(true)}}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src={group.groupPic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex  flex-col gap- justify-between">
            <p className="font-bold dark:text-gray-100 text-gray-900">{group.name}</p>

          </div>
        </div>
      </div>

    </>
  );
};

export default GroupsStripe;
