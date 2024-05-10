import UserModel from '../models/UserModel.js'
//POST
const createUser = async(req, res)=>{
   try {
        const {firstname,lastname,email,password} = req.body
          //check data content
        if(!firstname || !lastname || !email || !password){
        const mgs = "Please all values"
        return res.status(404).json({mgs})
        }
        const user = await UserModel.create({firstname,lastname,email,password})
        res.status(200).json({user})
    } catch (error) {
        // console.log(error)
        res.status(500).json({error})
    }
}

const updateUser = async (req, res)=> {
    const {firstname,lastname,email,password} = req.body

    if(!firstname || !lastname || !email || !password){
    const mgs = "Please all values"
    return res.status(404).json({mgs})
    }
     const user = await UserModel.findOne({_id:req.params.id})

    if(!user){
        const msg = `No such User`;
        return res.status(404).json({msg})
    }

    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = password;
  
    await user.save()
    res.status(200).json({user})
}

const getUsers = async(req, res)=>{
    const user = await UserModel.find();
    res.status(200).json({user})
 }

 const getUser = async(req, res)=>{
    try {
        const user = await UserModel.findOne({_id:req.params.id})
    if(!user){
        const msg = `No such User with the Id: ${req.params.id}`;
        return res.status(404).json({msg})
    }
    res.status(200).json({user})
    } catch (error) {
        return res.status(404).json({error})
    }
 }

 const deleteUser = async(req, res)=>{
    try {
        const user = await UserModel.findByIdAndDelete({_id:req.params.id})
    if(!user){
        const msg = `No such User with the Id: ${req.params.id}`;
        return res.status(404).json({msg})
    }
    res.status(200).json("User Deleted")
    } catch (error) {
        return res.status(404).json({error})
    }
 }

 export {createUser, updateUser, getUser, getUsers,deleteUser}