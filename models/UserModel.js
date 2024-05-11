import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from "validator";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim: true,
        required:["Please Provide Your firstname"],
        maxLength:50,
        minLength:1
    },
    lastname:{
        type:String,
        trim: true,
        required:["Please Provide Your lastname"],
        maxLength:50,
        minLength:1
    },
    email:{
        type:String,
        required:["Please Provide Your email"],
        unique:true,
        validator: validator.isEmail,
        message: 'Please provide a valid email'
    },
    password:{
        type:String,
        required:['please provide email'],
        minLength:6,
    }
    
    }, {timestamps:true})

    
//presave with hash password
UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME} )
}

UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch;
}
    export default mongoose.model('User', UserSchema)