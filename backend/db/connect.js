import mongoose, { connect } from "mongoose";

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connected to mongoDB successfully !!");
    } catch (error) {
        console.log("something went wrong : ", error.message)
    }
}

export default connectToMongoDB;