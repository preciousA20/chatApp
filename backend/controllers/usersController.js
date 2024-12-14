import User from "../model/usersSchema.js"

export const getUserForSideBar = async(req, res)=>{
    try {
        const loggedInUser = req.userId 
        const users = await User.find({_id: {$ne: loggedInUser}})
        // const user = await User.find()
        // const users = user.find((person)=>person._id !== loggedInUser)
        if(!users){
            return res.status(404).json({error: "No user found..."})
        }

        // const {password: pass, ...others} = users._doc
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const getSingleUser = async(req, res)=>{
    try {
        const { id } = req.params 
        const foundUser = await User.findById(id)
        if(!foundUser){
            return res.status(404).json({error: `User with the given ID ${id} is not found!`})
        }
        res.status(200).json(foundUser)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


export const updateUser = async(req, res)=>{
    try {
        const {profilePic} = req.body 
        const foundUser = await User.findByIdAndUpdate(req.userId,{
            $set: {
                profilePic: profilePic
            }
        }, {new: true})
        res.status(200).json(foundUser)
    } catch (error) {
        return res.status(error.message)
    }
}