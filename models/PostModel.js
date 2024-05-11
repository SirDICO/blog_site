import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        required:["Please Provide Post title"],
    },
    postContent:{
        type:String,
        trim: true,
        required:["Please Provide Post content"],
    },
    categoryId:{
        type:mongoose.Schema.Type.ObjectId,
        ref:'Category',
        required:["Please Provide Post Category"],
    },
   createdBy:{
    type:mongoose.Schema.Type.ObjectId,
    ref:'User',
    required:["Please Provide Post User"],
   }

    }, {timestamps:true})

    export default mongoose.model('Post', PostSchema)