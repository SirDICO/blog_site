import PostModel from '../models/PostModel.js'
//POST
const createPost = async(req, res)=>{
    const {title,postContent} = req.body
          //check data content
        if(!title || !postContent ){
        const mgs = "Please provide title post content"
        return res.status(404).json({mgs})
        }
        
        req.body.createdBy = req.user.id
        const user = await UserModel.create({firstname,lastname,email,password})
        res.status(200).json({user})
}
const updatePost = async(req, res)=>{}
const getPost = async(req, res)=>{}
const getPosts = async(req, res)=>{}
const deletePost = async(req, res)=>{}

export {createPost, updatePost, getPost, getPosts, deletePost}