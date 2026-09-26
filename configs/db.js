import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return true
        } else {
            await mongoose.connect("mongodb://localhost:27017/next-auth")
            console.log("Connect To DB")
        }
    } catch (err) {
        console.log(err)
    }
}

export default connectToDB