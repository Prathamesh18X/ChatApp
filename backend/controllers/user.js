import User from "../models/user.js";
import Conversation from "../models/conversationModel.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id: blockedUserId } = req.params; // Conversation ID and User ID to block/unblock
    const blockerUserId = req.user._id; // The ID of the user who wants to block/unblock

    // Find the conversation
    const conversation = await Conversation.findOne({
      participant: { $all: [blockerUserId, blockedUserId] },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const blocker = await User.findOne(blockerUserId);
    // Check if the user is already blocked
    const isBlockedUser = blocker.blockedUsers.includes(blockedUserId);
    // console.log("isBlocked",isBlocked);
    if (isBlockedUser) {
      // If already blocked, unblock the user
      blocker.blockedUsers.pop(blockedUserId);
      await blocker.save();
      res
        .status(200)
        .json({ message: `User unblocked successfully`, isBlocked: false });
    } else {
      // If not blocked, block the user
      blocker.blockedUsers.push(blockedUserId);
      await blocker.save();
      res
        .status(200)
        .json({ message: "User blocked successfully", isBlocked: true });
    }
  } catch (error) {
    console.log("Error in blockUser controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBlockedStatus = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const sender = await User.findById(senderId);

    if (receiverId == 0) {
      // If no receiverId provided, return list of blocked users with their full names and usernames
      const blockedUsers = await User.find({ _id: { $in: sender.blockedUsers } }, '-email');
      return res.status(200).json({ blockedUsers });
    }
    const isBlocked = sender.blockedUsers.includes(receiverId);

    return res.status(200).json({ isBlocked });
  } catch (error) {
    console.log("Error in getBlockedUsers controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
