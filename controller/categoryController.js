import CategoryModel from '../models/CategoryModel.js'
import { StatusCodes } from 'http-status-codes'
//POST
const createCategory = async(req, res)=>{
 
        const {categoryName} = req.body
          //check data content
        if(!categoryName){
            throw new BadRequestError('Provide a Category Name')
        }
        const categoryAlreadyExists = await UserModel.findOne({categoryName});
        if(categoryAlreadyExists ){
          throw new BadRequestError('Category already in use')
        }
        const category = await CategoryModel.create({categoryName})
        res.status(StatusCodes.CREATED).json({category})
   
 }
const updateCategory = async(req, res)=>{
    const {categoryName} = req.body
    
     const category = await CategoryModel.findOne({_id:req.params.id})

    if(!category){
        throw new BadRequestError('No such Category Available')
    }

    category.categoryName = categoryName;
  
    await category.save()
    res.status(StatusCodes.OK).json({category})
 }

const getCategories = async(req, res)=>{ 
    const category = await CategoryModel.find();
    if(!category){
        throw new BadRequestError('No Category Available')
    }
    res.status(StatusCodes.OK).json({category})
}
const getCategory = async(req, res)=>{ 
 
        const category = await CategoryModel.findOne({_id:req.params.id})
    if(!category){
        throw new BadRequestError('No Category Available')
    }
    res.status(StatusCodes.OK).json({category})
  
}
const deleteCategory = async(req, res)=>{ 
  
        const category = await CategoryModel.findByIdAndDelete({_id:req.params.id})
        if(!category){
            throw new BadRequestError('No Such Category Available')
        }
    res.status(200).json("Category Deleted")
   
}
    export {createCategory, updateCategory, getCategories, getCategory, deleteCategory}