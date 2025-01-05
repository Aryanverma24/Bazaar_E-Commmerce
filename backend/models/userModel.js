import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            unique: true,
            required : true
        },
        email : {
            type:String,
            required : true,
            unique : true,
        },
        password : {
            type: String,
            required:true,
            minLength : [8,"Password must have 8 characters"]
        },
        isAdmin :{
            type: Boolean,
            required : true,
            default : false
        }
    },
    {
    timestamps: true
})

export const User = mongoose.model("User",userSchema)
export default User ;
