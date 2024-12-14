import express from 'express'
import { sendMessage, getMessages } from '../controllers/messageControlller.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()


router.get('/:id', verifyToken, getMessages)
router.post('/send/:id', verifyToken, sendMessage)

export default router 