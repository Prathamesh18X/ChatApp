import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { IoMdContact } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import Profile from "../Menu/Profile.jsx";
import Account from "../Menu/Account.jsx";
import PrivacyAndSecurity from "../Menu/PrivacyAndSecurity.jsx";

const ProfileModal = () => {
  const { authUser } = useAuth();
  const [menu, setMenu] = useState("Profile");

  const handleMenuSelection = (menu) => {
    setMenu(menu);
  };
  const handleCloseModal = () => {
    setMenu("Profile");
    
  }

  //   console.log(authUser);
  return (
    <div>
      <img
        src={authUser.profilePic}
        alt=""
        onClick={() => document.getElementById("profileModal").showModal()}
        className="w-8 h-8 rounded-full cursor-pointer object-cover"
      />
      <dialog id="profileModal" className="modal">
        <div className=" modal-box flex p-0 bg-white text-black absolute translate-y-16 left-2 bottom-10 duration-300">
          {/*body*/}
          <>
            <ul className="menu bg-blue-200 text-black w-48 h-[72vh]">
              <li
                className={menu === "Profile" ? "active" : ""}
                onClick={() => handleMenuSelection("Profile")}
              >
                <a>
                  <IoMdContact className="w-6 h-6" />
                  <span>Profile</span>
                </a>
              </li>
              <li
                className={menu === "Privacy" ? "active" : ""}
                onClick={() => handleMenuSelection("Privacy")}
              >
                <a>
                  <MdOutlineSecurity className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </a>
              </li>
              <li
                className={menu === "Account" ? "active" : ""}
                onClick={() => handleMenuSelection("Account")}
              >
                <a>
                  <MdManageAccounts className="w-5 h-5" />
                  <span>Account</span>
                </a>
              </li>
              <li
                className={menu === "Help" ? "active" : ""}
                onClick={() => handleMenuSelection("Help")}
              >
                <a>
                  <IoIosHelpCircle className="w-5 h-5" />
                  <span>Help</span>
                </a>
              </li>
            </ul>

            {/* Right side: Workable component */}
            <div className="flex-1 p-4">
              {menu === "Profile" && (
                <div>
                  <Profile />
                </div>
              )}
              {menu === "Privacy" && (
                <div>
                  <PrivacyAndSecurity/>
                </div>
              )}
              {menu === "Account" && (
                <div>
                  <Account/>
                </div>
              )}
              {menu === "Help" && (
                <div>
                  <h2>Help Content</h2>
                  <p className="text-[11px] mt-2">contact</p>
                  
                </div>
              )}
            </div>
          </>
          {/*body ends*/}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProfileModal;
