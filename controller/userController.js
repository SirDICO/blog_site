import UserModel from '../models/UserModel.js'
import {StatusCodes} from 'http-status-codes'

/** **************************************
Any request that contains 
this listed error would be throw passed to 
the appropriate middlewares 
*****************************************/ 
import {
    BadRequestError, 
    NotFoundError, 
    UnAuthenticatedError
} from '../errors/index.js'


/** **************************************
CREATE USER
POST:
ACCESS:
URL: /api/v1/user/create
*****************************************/ 
const createUser = async(req, res)=>{
   
        const {firstname,lastname,email,password} = req.body
     
        //check if user is not empty
        if(!firstname || !lastname || !email || !password){
            throw new BadRequestError('please provide all values'); 
        }
        
        //check if user exist in db
        const userEmailAlreadyExists = await UserModel.findOne({email});
        if(userEmailAlreadyExists ){
          throw new BadRequestError('Email already in use')
        }

        //add user to db
        const user = await UserModel.create({firstname,lastname,email,password})
       
        //create token
        const token = user.createJWT()
        
        //pass undefined password to user 
        //we redefine this later so we can share only what user need to see. 
        user.password = undefined;
        res.status(StatusCodes.CREATED).json({user, token})
  
}


/** **************************************
lOGIN
POST:
ACCESS:  
*****************************************/ 

const loginUser = async(req, res) =>{
    const {email, password} = req.body
    
    //check if not empty
    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }

    //check if user exist in db
    const user =await UserModel.findOne({email}).select('+password')
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    //compare password
   const isPasswordCorrect = await  user.comparePassword(password)
    if(!isPasswordCorrect){
       throw new UnAuthenticatedError('Invalid Credentials')
    }

    //create JWT TOKEN
    const token = user.createJWT();

    //make password undefined
    user.password = undefined;

    res.status(StatusCodes.OK).json({user, token})
}

/** **************************************
UPDATE USER
PATCH:
ACCESS: 
URL: 
*****************************************/ 

const updateUser = async (req, res)=> {
    const {firstname,lastname,email,password} = req.body

    if(!firstname || !lastname || !email || !password){
        throw new BadRequestError('Please provide all values')
    }

     const user = await UserModel.findOne({_id:req.params.id})

    if(!user){
        throw new BadRequestError('No such user found!')
    }

    //re-assign new values into existing variables holding previous values.
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = password;

    //create jwt token
    const token = user.createJWT()

    //save to db
    await user.save()

    res.status(StatusCodes.OK).json({user, token})
}

/** **************************************
GET ALL USERS
POST:
ACCESS:  
URL: /api/v1/user
*****************************************/ 
const getUsers = async(req, res)=>{
    const user = await UserModel.find();
    res.status(StatusCodes.OK).json({user})
 }


/** **************************************
GET USER
POST:
ACCESS:  
URL: /api/v1/user/:id
*****************************************/ 
 const getUser = async(req, res)=>{
  
        const user = await UserModel.findOne({_id:req.params.id})
            if(!user){
                throw new BadRequestError(`No user with the ID: ${req.params.id} found!`)
            }
        res.status(StatusCodes.OK).json({user})
   
 }

 /****************************************
DELETE USER
POST:
ACCESS:  
URL: /api/v1/user/:id
*****************************************/ 
 const deleteUser = async(req, res)=>{
 
        const user = await UserModel.findByIdAndDelete({_id:req.params.id})
            if(!user){
                throw new BadRequestError(`No user with the ID: ${req.params.id} found!`)
            }
         res.status(StatusCodes.OK).json("User Deleted")
 }

 /** **************************************
  EXPORT EACH FUNCTION TO THE ROUTES 
*****************************************/ 
 export {createUser, updateUser, getUser,loginUser, getUsers,deleteUser}