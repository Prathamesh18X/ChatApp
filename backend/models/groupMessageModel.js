import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        senderUserName: {
            type: String,
            required: true,
        },
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
    }
);

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

export default GroupMessage;
