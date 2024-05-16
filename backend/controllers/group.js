import Group from "../models/groupModel.js";
import { io } from "../socket/socket.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import getDataUri from "../utils/dataURI.js";


export const getGroups = async (req, res) => {//working
    try {
        // Get the logged-in user's ID from the request
        const loggedInUserId = req.user._id;
        // console.log(loggedInUserId);

        // Query the Group model for groups where the logged-in user is a member
        const userGroups = await Group.find({
            participants: loggedInUserId,
        }).select("-__v");

        // Return the list of groups the user is part of
        res.status(200).json(userGroups);
    } catch (error) {
        console.error("Error in getGroups controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const createGroup = async (req, res) => {
    try {
        const { name, participants } = req.body;
        const participantsArray = JSON.parse(participants);
        console.log(name, participants);
        const groupPicFile = req.file;

        // Validate input
        if (!name || !participantsArray || !Array.isArray(participantsArray)) {
            return res.status(400).json({ error: "Invalid input data" });
        }

        // Check for duplicate group name
        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ error: "Group name already exists" });
        }

        // Handle group picture upload
        let groupPicUrl = null;
        if (groupPicFile) {
            const groupPicUri = await getDataUri(groupPicFile);
            const result = await uploadToCloudinary(groupPicUri.content);
            groupPicUrl = result.url;
        }

        // Fallback to dummy image URL if no group picture was uploaded
        const dummyGroupPic = `https://i.postimg.cc/ZRBTXn9y/group-Dummy.png`;
        groupPicUrl = groupPicUrl || dummyGroupPic;

        // Create a new group with the provided name and participants
        const newGroup = new Group({
            name,
            groupPic: groupPicUrl,
            participants: participantsArray,
        });

        // Save the new group to the database
        await newGroup.save();

        // Emit the "newGroupCreated" event to notify clients
        io.emit("newGroupCreated", newGroup);

        // Return the newly created group information
        res.status(201).json({
            groupId: newGroup._id,
            groupName: newGroup.name,
            participants: newGroup.participants,
            success: "Group created successfully",
        });
    } catch (error) {
        console.error("Error in createGroup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const addMemberToGroup = async (req, res) => {//working
    try {
        const { groupId } = req.params;
        const {userId} = req.body;

        // Find the group by its ID
        const group = await Group.findById(groupId);
        
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is already a member of the group
        if (group.participants.includes(userId)) {
            return res.status(400).json({ error: "User is already a member of the group" });
        }

        // Add the new member's user ID to the group's participants array
        group.participants.push(userId);

        // Save the updated group to the database
        await group.save();

        // Return the updated group information
        res.status(200).json({
            groupId: group._id,
            groupName: group.name,
            participants: group.participants,
            success: "Member added to group successfully",
        });
    } catch (error) {
        console.error("Error in addMemberToGroup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const removeMemberFromGroup = async (req, res) => {//working
    try {
        const { groupId } = req.params;
        const { userId } = req.body;

        // Find the group by its ID
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if the user is a member of the group
        if (!group.participants.includes(userId)) {
            return res.status(400).json({ error: "User is not a member of the group" });
        }

        // Remove the user's user ID from the group's participants array
        group.participants = group.participants.filter((id) => id.toString() !== userId);

        // Save the updated group to the database
        await group.save();

        // Return the updated group information
        res.status(200).json({
            groupId: group._id,
            groupName: group.name,
            participants: group.participants,
            success: "Member removed from group successfully",
        })
    } catch (error) {
        console.error("Error in removeMemberFromGroup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}