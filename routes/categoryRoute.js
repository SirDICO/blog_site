import {
    createCategory, 
    updateCategory, 
    getCategories, 
    getCategory,
     deleteCategory} from '../controller/categoryController.js'
import express from 'express'
const router =  express.Router()

router.route('/create').post(createCategory)
router.route('/update/:id').patch(updateCategory)
router.route('/find/:id').get(getCategory)
router.route('/').get(getCategories)
router.route('/delete/:id').delete(deleteCategory)

export default router;