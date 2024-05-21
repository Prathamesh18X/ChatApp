import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import LogoutButton from "../QuickButtons/LogoutButton";
import ImageModal from "../Modals/ImageModal";
import toast from "react-hot-toast";


const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { authUser } = useAuth();
  const [fullName, setFullName] = useState(authUser.fullName);
  const [userName, setUserName] = useState(authUser.userName);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(authUser.profilePic);
  const modal = document.getElementById("image-modal");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    const imageUrl = URL.createObjectURL(file);
    setProfilePicUrl(imageUrl);
  };

  const handleEdit = () => {
    setEdit(!edit);
    setUserName(authUser.userName);
    setFullName(authUser.fullName);
    setProfilePicUrl(authUser.profilePic);
  }

  const handleOpenProfilePic = () => {
    modal.showModal();
  }
  //handling server
  const handleProfileUpdate = async () => {
 try {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
    const response = await fetch("/api/auth/update", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if(response.ok){
      setEdit(false);
      setProfilePicUrl(data.profilePic);
      toast.success("user profile updated successfully");
    }else{
      toast.error(data.error);
    }
  }catch (error) {
    toast.error(error.message);
   }  
 } 

  return (
    <div>
      <div className="flex justify-between">
        <span className="font-bold text-lg">Profile</span>
        <span>
          <FaRegEdit
            onClick={handleEdit}
            className="cursor-pointer h-4 w-4"
          />
        </span>
      </div>
        {edit ? (
          <>
            <label htmlFor="profilePic">
          <img
            className="w-32 h-32 rounded-full cursor-pointer object-cover mt-2"
            src={profilePicUrl}
            alt=""
            />
            {edit ? <MdEdit className="relative bottom-3 left-28 cursor-pointer" /> : null}
        </label>
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
          </>
        ) : <img
        src={profilePicUrl}
        alt="profile"
        onClick={handleOpenProfilePic}
        className="w-32 h-32 rounded-full cursor-pointer object-cover"
        style={{ display: edit ? "none" : "block" }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />}
        
      <div className="font-bold text-2xl my-2">
        {edit ? (
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            className="input bg-slate-200  "
            value={fullName}
          />
        ) : (
          fullName
        )}
      </div>
      <div>
        {edit ? (
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            className="input bg-slate-200 input-sm "
            value={userName}
          />
        ) : (
          userName
        )}
      </div>
      <div className="my-3">
        <label htmlFor="" className="font-bold text-lg">
          Email <span className="text-[12px]">(Unique ID)</span>
        </label>
        <br />
        {authUser.email}
      </div>
      <hr />
      <div className=" flex justify-between mt-3">
        <LogoutButton />
        <div>
        {edit ? <button className="btn btn-sm btn-ghost" onClick={handleEdit}>cancel</button> : null}
        {edit ? <button className="btn btn-sm btn-success" onClick={handleProfileUpdate}>Save</button> : null}
        </div>


      </div>
        <p className="text-[12px] ">your all chats will be removed from this device</p>
        <ImageModal image={profilePicUrl} />
    </div>
  );
};

export default Profile;
