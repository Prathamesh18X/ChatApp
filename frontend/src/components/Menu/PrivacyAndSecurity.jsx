import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const PrivacyAndSecurity = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/users/block/0`);
      if (!response.ok) {
        throw new Error("Failed to fetch blocked users");
      }
      const data = await response.json();
      setBlockedUsers(data.blockedUsers);
    } catch (error) {
      console.error("Error fetching blocked users:", error);
    }
  };

  const handleBlockChat = async (userId) => {
    try {
      const res = await fetch(`/api/users/block/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to unblock user");
      }
      // Remove the unblocked user from the blockedUsers array
      setBlockedUsers(blockedUsers.filter(user => user._id !== userId));
      toast.success("User unblocked successfully");
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user");
    }
  };

  return (
    <>
      <div>
        <span className="font-bold text-lg">Privacy</span>
        <p className="text-gray-500 text-[12px] mb-4">
          Setting to be implemented soon...
        </p>
      </div>
      <div>
        <span className="font-bold text-lg">Security</span>
        <div>
          Blocked Users ({blockedUsers.length})
          <ul>
            {blockedUsers.map((user) => (
              <li key={user._id}>
                <div className="flex gap-2 items-center my-4">
                  <div className={`avatar `}>
                    <div className="w-12 rounded-full">
                      <img
                        src={user.profilePic}
                        alt="user avatar"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex  flex-col gap- justify-between">
                      <p className="font-bold text-md text-gray-700 dark:text-gray-300">
                        {user.fullName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-error btn-sm" onClick={() => handleBlockChat(user._id)}>unblock</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PrivacyAndSecurity;
