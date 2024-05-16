import React from "react";
import { IoIosClose } from "react-icons/io";

const ProfileInfoModal = ({info}) => {
  const modal = document.getElementById("profile-info-modal");
  
  const convertToDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const dd = date.getDate();
    const month = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const mm = monthNames[month];
    const yy = date.getFullYear();
    return `${dd} ${mm}, ${yy}`
  }
  const joinedAt = convertToDateAndTime(info.createdAt)
  
  // console.log(info);
  return (
    <dialog id="profile-info-modal" className="modal">
      <div className="modal-box p-[0px] h-[100%] w-[100%] bg-white relative ">
        <button
          className="absolute top-1 right-1 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => modal.close()}
        >
          <IoIosClose className="h-7 w-7" />
        </button>
        {/*content*/}
        <div className="flex flex-col items-center">
            <div className="bg-slate-300 dark:bg-slate-700 h-[100%] w-[100%]">
            <img src={info.profilePic} className="relative top-12 rounded-full left-20 flex justify-center w-80" alt="not found " />
            </div>

            <div className="bg-white mt-14 text-center dark:bg-slate-700">
            <div className="text-2xl font-bold">{info.fullName} <span className="text-[10px]">{`(${info.userName})`}</span></div>
            <p className="text-sm">{info.email}</p>
            <p>{info.gender}</p>
            <p>JoinedAt : {joinedAt}</p>

            </div>
            

        </div>
      </div>
    </dialog>
  );
};

export default ProfileInfoModal;
