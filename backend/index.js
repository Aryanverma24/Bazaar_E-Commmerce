
// packages 
import express from "express";
import path from "path"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"

// utils 
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from './routes/category.js'
import ProductRoutes from "./routes/ProductRoutes.js"
import UploadRoutes from "./routes/UploadRoutes.js"
//config

dotenv.config()

const port =process.env.port || 5000

dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product",ProductRoutes);
app.use("/api/upload",UploadRoutes);

const __dirname = path.resolve()
app.use("/uploads",express.static(path.join(__dirname + "/uploads")))

app.listen(port , ()=>{
    console.log(`server is running on the port ${port}`)
})
