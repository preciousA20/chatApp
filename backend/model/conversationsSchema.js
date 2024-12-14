import mongoose from 'mongoose'

const conversationsSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: [] 
    }],

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
},{
    timestamps: true
})

const Conversation = mongoose.model('Conversation', conversationsSchema)
export default Conversation 