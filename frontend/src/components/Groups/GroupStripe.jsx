import React from "react";
import {useGroup} from "../../zustand/useGroup.js";
const GroupsStripe = ({ group }) => {
  const {selectedGroup, setSelectedGroup } = useGroup();
  // console.log(group);
  const isSelected = selectedGroup?._id === group._id;

  return (  
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-400 rounded p-2 py-1 cursor-pointer 
		${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedGroup(group)}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src={group.groupPic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex  flex-col gap- justify-between">
            <p className="font-bold text-gray-500">{group.name}</p>

          </div>
        </div>
      </div>

    </>
  );
};

export default GroupsStripe;
