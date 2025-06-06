import mongoose , {ObjectId } from "mongoose";

const reviewSchema = new mongoose.Schema({
    name : { type : String, required : true},
    rating: { type:Number, required : true },
    comment : { type : String, required : true},
    user :{ type : mongoose.Schema.Types.ObjectId, ref : "User" , required : true }
} , {timestamps:true})

const ProductSchema = new mongoose.Schema({
    name :{ type : String, required : true },
    image : {type : String , required : true },
    brand : { type : String , required : true },
    quantity : {type : Number , required : true },
    category : {type : mongoose.Schema.Types.ObjectId , ref : "Category" , required : true},
    description : { type : String , required : true },
    reviews : [reviewSchema],
    rating : {type :  Number , required : true , default : 0 },
    numReviews : { type : Number , required : true , default : 0 } ,
    price : { type : Number , required : true, default : 0 },
    countInStock : { type : Number , required : true , default : 0 }
},{timestamps : true})

export const Product = mongoose.model("Product",ProductSchema);
export default Product;