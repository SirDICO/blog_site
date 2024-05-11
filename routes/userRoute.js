import express from 'express'
import {createUser, updateUser,loginUser, getUser, getUsers,deleteUser} from '../controller/userController.js'
import authenticateUser from '../middlewares/auth.js'
const router =  express.Router()

router.route('/create').post(authenticateUser, createUser)
router.route('/login').post(loginUser)
router.route('/:id').patch(authenticateUser,updateUser).get(getUser).delete(authenticateUser,deleteUser)
router.route('/').get(getUsers)

export default router;