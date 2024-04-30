import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import GroupMessage from "../models/groupMessageModel.js";
import Group from "../models/groupModel.js";
import User from "../models/user.js";
import { getReceiverSocketId, getGroupReceiverSocketIds  , io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // from protected route

    //check conversation between , create chat/conversation
    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participant: [senderId, receiverId],
      });
    }

    //create message
    const newMessage = await Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    //save message and conversation in database.one by one
    // await conversation.save()
    // await newMessage.save()

    //save parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // find to who message is being send.
    const receiverSocketId = getReceiverSocketId(receiverId); //from database
    if (receiverSocketId) {
      //send message to receiver
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // console.log("message send to :", receiver.userName)
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage Controller : ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participant: { $all: [senderId, receiverId] },
    }).populate("message");
    /**
        // - populate method  => 
        In Mongoose, the populate() method is used to replace specified paths 
        in a document with document(s) from other collections. This is particularly
        useful when you have references to other documents in your schema.
        */
    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.message);
  } catch (error) {
    console.log("error in getMessage Controller : ", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};


export const sendGroupMessage = async (req, res) => {
    try {
        // Extract the group ID from the request parameters
        const { id : groupId } = req.params;
        // Extract the message content from the request body
        const { message } = req.body;
        // console.log("message : ", req.user._id );
        // Get the sender's user ID from the request (set by the protectRoute middleware)
        const senderId = req.user._id; 
        const senderUserName = req.user.userName;

        // Find the group by its ID
        const group = await Group.findById(groupId);
        
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the sender is part of the group
        if (!group.participants.includes(senderId)) {
            return res.status(403).json({ error: "Sender is not a member of the group" });
        }

        // Create a new group message
        const newGroupMessage = new GroupMessage({
            senderId,
            groupId,
            senderUserName,
            message,
        });

        // Save the group message
        await newGroupMessage.save();

        // Notify all group participants (except the sender) using sockets
        // You can use a custom function to get the socket IDs of all group participants except the sender
        const receiverSocketIds = getGroupReceiverSocketIds(group.participants, senderId);
        if (receiverSocketIds && receiverSocketIds.length > 0) {
            // Notify each group participant (excluding the sender)
            receiverSocketIds.forEach((socketId) => {
                io.to(socketId).emit("newGroupMessage", newGroupMessage);
            });
        }

        // Return the new group message as the response
        res.status(201).json(newGroupMessage);
    } catch (error) {
        console.error("Error in sendGroupMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getGroupMessages = async (req, res) => {
  try {
      // Extract the group ID from the request parameters
      const { id: groupId } = req.params;
      // Get the sender's user ID from the request (set by the protectRoute middleware)
      const senderId = req.user._id;

      // Find the group by its ID
      const group = await Group.findById(groupId);

      if (!group) {
          return res.status(404).json({ error: "Group not found" });
      }

      // Check if the user is part of the group
      if (!group.participants.includes(senderId)) {
          return res.status(403).json({ error: "User is not a member of the group" });
      }

      // Retrieve the group's messages and populate the sender details
      const groupMessages = await GroupMessage.find({
          groupId: groupId,
      })

      // Return the group's messages as the response
      res.status(200).json(groupMessages);
  } catch (error) {
      console.error("Error in getGroupMessages controller:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};