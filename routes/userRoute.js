import express from 'express'
import {createUser, updateUser, getUser, getUsers,deleteUser} from '../controller/userController.js'

const router =  express.Router()

router.route('/create').post(createUser)
router.route('/update/:id').patch(updateUser)
router.route('/find/:id').get(getUser)
router.route('/').get(getUsers)
router.route('/delete/:id').delete(deleteUser)

export default router;