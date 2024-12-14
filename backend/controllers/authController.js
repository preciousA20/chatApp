import User from "../model/usersSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerController = async(req, res)=>{
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body 
        // console.log(req.body)
        // console.log({fullName, username, password, confirmPassword, gender})
        if(password !== confirmPassword){
            return res.status(400).json({error: "password does not match..."}) 
        }

        const user = await User.findOne({username})
 
        if(user){
            return res.status(400).json({error: `User ${username} already existed. Proceed to login`})
        }

        const salt = await bcrypt.genSalt(10)
     
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            gender, 
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        // Generate JWT token 
        const token = jwt.sign({userId: savedUser._id}, process.env.JWT_SECRET,{expiresIn: '15d'})

        res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
        })

        return res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            gender: savedUser.gender,
            username: savedUser.username,
            profilePic: savedUser.profilePic 
        })

    } catch (error) {
        if(error){
            return res.status(500).json({error: error.message})
        }
    }

}


export const loginController = async(req, res)=>{
    const { username, password} = req.body 
    if(!username || !password){
        return res.status(400).json({error: "Invalid credentials..."})
    }
    try {
        const foundUser = await User.findOne({username})
        if(!foundUser){
            return res.status(404).json({error: `The username ${username} is not registered...`})
        }

        const foundPassword = await bcrypt.compare(password, foundUser.password)
        if(!foundPassword){
            return res.status(400).json({error: 'Incorrect password...'})
        }

        const token = jwt.sign({"userId": foundUser._id}, process.env.JWT_SECRET, {expiresIn: '15d'})
        res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            _id: foundUser._id,
            fullName: foundUser.fullName,
            gender: foundUser.gender,
            username: foundUser.username,
            profilePic: foundUser.profilePic
        })
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

export const logoutController = async(req, res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		
		res.status(500).json({ error: "Internal Server Error" });
	}
    // try {
    //     const cookies = req.cookies 
    //    if(!cookies){
    //     return res.status(404).json({error: "You are not logged in..."})
    //    }

    //    const jwt = cookies?.jwt 
    //    if(!jwt){
    //     return res.status(404).json({error: "No cookie set"})
    //    }

    //    res.clear('jwt', "", {httpOnly: true, sameSite: 'None', secure: process.env.NODE_ENV !== 'development'})
    //    return res.status(200).json('You are logged out successfully...')
    // } catch (error) {
    //     res.status(400).json({error: error.message})
    // } 
}