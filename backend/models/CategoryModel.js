import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name : {
        type : String ,
        unique : true,
        required : true,
        trim : true ,
        maxLength : 32
    }
},{timestamps:true})

export const Category = mongoose.model("Category",CategorySchema);
export default Category;