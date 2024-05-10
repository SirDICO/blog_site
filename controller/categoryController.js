import CategoryModel from '../models/CategoryModel.js'
//POST
const createCategory = async(req, res)=>{
    try {
        const {categoryName} = req.body
          //check data content
        if(!categoryName){
        const mgs = "Please all values"
        return res.status(404).json({mgs})
        }
        const category = await CategoryModel.create({categoryName})
        res.status(200).json({category})
    } catch (error) {
        // console.log(error)
        res.status(500).json({error})
    }
 }
const updateCategory = async(req, res)=>{
    const {categoryName} = req.body
          //check data content
        if(!categoryName){
        const mgs = "Please all values"
        return res.status(404).json({mgs})
        }
     const category = await CategoryModel.findOne({_id:req.params.id})

    if(!category){
        const msg = `No such Category`;
        return res.status(404).json({msg})
    }

    category.categoryName = categoryName;
  
    await category.save()
    res.status(200).json({category})
 }

const getCategories = async(req, res)=>{ 
    const category = await CategoryModel.find();
    res.status(200).json({category})
}
const getCategory = async(req, res)=>{ 
    try {
        const category = await CategoryModel.findOne({_id:req.params.id})
    if(!category){
        const msg = `No such Category with the Id: ${req.params.id}`;
        return res.status(404).json({msg})
    }
    res.status(200).json({category})
    } catch (error) {
        return res.status(404).json({error})
    }
}
const deleteCategory = async(req, res)=>{ 
    try {
        const category = await CategoryModel.findByIdAndDelete({_id:req.params.id})
    if(!category){
        const msg = `No such category with the Id: ${req.params.id}`;
        return res.status(404).json({msg})
    }
    res.status(200).json("Category Deleted")
    } catch (error) {
        return res.status(404).json({error})
    }
}
    export {createCategory, updateCategory, getCategories, getCategory, deleteCategory}