
import Message from '../model/messagesSchema.js'
import Conversation from '../model/conversationsSchema.js'
import { getReceiverId, io } from '../socket/socket.js'

export const sendMessage = async(req, res)=>{
    try {
        const { message } = req.body 
        const {id} = req?.params 
        const receiverId = id 
        // console.log(receiverId) 
        const senderId = req.userId 
        
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessages = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessages){
            conversation.messages = [...conversation.messages, newMessages._id]
            
            // console.log(newMessages._id)
        }
        // console.log(conversation.messages)
        await Promise.all([conversation.save(), newMessages.save()])


        //SOCKET.IO HERE 
        const receiverSocketId = getReceiverId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessages)
        }
        res.status(201).json(
            newMessages
        )
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


export const getMessages = async(req, res)=>{
    try {
        const { id } = req.params 
        const receiverId = id 
        const senderId = req.userId 

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate('messages')
      
        res.status(200).json(conversation.messages)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}