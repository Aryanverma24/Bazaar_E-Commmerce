import mongoose from "mongoose";

const dbConnect = async () =>{
    try {
       await mongoose.connect(process.env.MONGODB_URI)
       console.log(`Successfully connect to DataBase :)`)
    } catch (error) {
        console.log(`Some Error occured while connecting Database ${error.message}`)
    }
}

export default dbConnect