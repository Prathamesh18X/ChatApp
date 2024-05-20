import React from "react";
import { IoIosClose } from "react-icons/io";
import { FaEnvelope, FaUser, FaCalendarAlt, FaPaperPlane, FaBan } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";


const ProfileInfoModal = ({ info }) => {
  const modal = document.getElementById("profile-info-modal");

  const convertToDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const dd = date.getDate();
    const month = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mm = monthNames[month];
    const yy = date.getFullYear();
    return `${dd} ${mm}, ${yy}`;
  };

  const joinedAt = convertToDateAndTime(info.createdAt);

  return (
    <dialog id="profile-info-modal" className="modal">
      <div className="modal-box p-0 h-[70vh] w-full bg-white relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => modal.close()}
        >
          <IoIosClose className="h-7 w-7" />
        </button>
        {/* content */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-200 dark:bg-slate-700 h-40 w-full flex justify-center items-center">
            <img src={info.profilePic} className="rounded-full w-36 h-36 object-cover border-4 border-white shadow-md" alt="Profile" />
          </div>
          <div className="bg-white dark:bg-slate-700 w-full p-4 text-center">
            <div className="text-2xl font-bold flex items-center justify-center gap-2">
              {info.fullName} <span className="text-sm text-gray-500">{`(${info.userName})`}</span>
            </div>
            <div className="mt-2 flex flex-col items-start space-y-2 text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2"><FaEnvelope className="text-gray-500" /> {info.email}</p>
              <p className="flex items-center gap-2"><IoPersonCircleSharp className="text-gray-500" /> {info.gender}</p>
              <p className="flex items-center gap-2"><FaCalendarAlt className="text-gray-500" /> Joined: {joinedAt}</p>
            </div>
            <div className="mt-4 flex flex-col  ">
              <button onClick={() => modal.close()} className="flex w-44 tems-center gap-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 focus:outline-none">
                <FaPaperPlane /> Send Message
              </button>
              <button  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-rose-500 rounded hover:bg-red-600 focus:outline-none">
                <FaBan /> Block User
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProfileInfoModal;
