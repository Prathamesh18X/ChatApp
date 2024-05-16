import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    groupPic: {
        type: String,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);

export default Group;
