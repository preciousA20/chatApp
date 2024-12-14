import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true 
    },
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female']
    },
    profilePic: { 
        type: String,
        default: "https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?rs=1&pid=ImgDetMain" 
    }
},{timeseries: true})

const User = mongoose.model("User", usersSchema)
export default User 