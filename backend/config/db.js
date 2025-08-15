import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:"./backend/.env"});

const dbConnect = async () =>{

    try {
       await mongoose.connect(process.env.MONGODB_URI)
       console.log(`Successfully connect to DataBase :)`)
    } catch (error) {
        console.log(`Some Error occured while connecting Database ${error.message}`)
    }
}

export default dbConnect