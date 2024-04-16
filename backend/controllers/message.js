import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/user.js";

export const sendMessage = async(req,res) => {
try {
    const {message} = req.body;
    const {id : receiverId} = req.params;
    const senderId = req.user._id; // from protected route


    //check conversation between , create chat/conversation
    let conversation = await Conversation.findOne({participant :{$all : [senderId , receiverId]}})
    if(!conversation){
        conversation = await Conversation.create({
            participant : [senderId , receiverId]
        })
    }


    //create message
    const newMessage = await Message({
        senderId,
        receiverId,
        message,
    })
    if(newMessage){
        conversation.message.push(newMessage._id);
    }
    //save message and conversation in database.one by one
    // await conversation.save()
    // await newMessage.save()

    //save parallel 
    await Promise.all([conversation.save(), newMessage.save()])
    
    // find to who message is being send.
    const receiver = await User.findById(receiverId) //from database
    console.log("message send to :", receiver.userName)

    res.status(200).json(newMessage)
} catch (error) {
    console.log("error in sendMessage Controller : ", error.message)
    res.status(500).json({error : "Internal Server error"})
}
    
}

export const getMessage = async(req,res) => {
    try {
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participant : {$all : [senderId , receiverId]}
        }).populate("message")
        /**
        // - populate method  => 
        In Mongoose, the populate() method is used to replace specified paths 
        in a document with document(s) from other collections. This is particularly
        useful when you have references to other documents in your schema.
        */
        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.message)
    } catch (error) {
        console.log("error in getMessage Controller : ", error.message)
        res.status(500).json({error : "Internal Server error"})
    } 
}