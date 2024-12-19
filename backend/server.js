import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import authRouter from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import usersRoute from './routes/usersRoute.js'
import { app, server } from './socket/socket.js'
const PORT = process.env.PORT || 3500 

const __dirname = path.resolve()

app.use(cors({
    origin: ['http://localhost:3000'], // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies if needed
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/message', messageRoute) 
app.use('/api/user', usersRoute)

app.use(express.static(path.join(__dirname, "/frontend1/dist")))

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend1", "dist", "index.html"))
})


const connectDB = async()=>{
    const url = process.env.MONGODB_URL 
    try {
        await mongoose.connect(url)
        console.log(`Successfully connected to MongoDB..`)
        server.listen(PORT, ()=>{ 
            console.log(`Server running on port ${PORT}...`)
        })
    } catch (error) {
        if(error){
            console.log(`error occurred while trying to connect ${error.message}`)
        }        
    }
}
connectDB()

