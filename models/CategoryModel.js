
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        trim: true,
        unique:true,
        required:["Please Provide Category Name"],
    },

    }, {timestamps:true})

    export default mongoose.model('Category', CategorySchema)