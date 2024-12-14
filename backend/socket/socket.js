import { Server } from "socket.io"
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
})

export const getReceiverId =(receiverId)=>{
    return userSocketMap[receiverId]
}

//Establish a connection 
let userSocketMap = {} // {userId: socket.id}
io.on('connection', (socket)=>{

    
    const userId = socket.handshake.query.userId
    if(userId !== "undefined"){
        userSocketMap[userId] = socket.id 
    }
    //console.log(userSocketMap)
    //io.emit() is use for sending events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    //socket.on() is use to listen for events both on client and server sides
    socket.on('disconnect', ()=>{
        //console.log('A user disconnected', socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})


export {app, io, server}