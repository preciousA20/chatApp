import jwt from 'jsonwebtoken'


export const verifyToken = async(req, res, next)=>{


    const cookies = req.cookies
    if(!cookies){
        return res.status(404).json({error: "No cookie set..."})
    }
    const token = cookies?.jwt 

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(403).json({error: "Expired token, please log in again..."})
        }
        req.userId = decoded.userId 
        next()
    })
}