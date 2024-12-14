import express from 'express'
import { getSingleUser, getUserForSideBar, updateUser } from '../controllers/usersController.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()

router.get('/', verifyToken, getUserForSideBar)
router.get('/:id', verifyToken, getSingleUser)
router.put('/update', verifyToken, updateUser)


export default router 