import Product, {} from "../models/ProductsModel.js"
import User from "../models/userModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"


const addProduct = asyncHandler(async(req,res)=>{
   try {
    const {name,description,price,quantity,category,brand} = req.fields

    switch (true) {
        case (!name):
            return res.status(400).json({error : "Name is required!"});
        case (!description):
            return res.status(400).json({error : "Description is required!"})
        case (!price):
            return res.status(400).json({error : "Price is required!"})
        case (!quantity):
            return res.status(400).json({error : "Quantity is required!"})
        case (!category):
            return res.status(400).json({error : "Category is required!"})
        case (!brand):
            return res.status(400).json({error : "Brand is required!"})
    }

    const product = new Product({...req.fields});
    await product.save();
    res.status(200).json(product);

   } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
   }
})

const updateProduct = asyncHandler(async(req,res)=>{
    try {
        const {name,description,price,quantity,category,brand} = req.fields

    switch (true) {
        case (!name):
            return res.status(400).json({error : "Name is required!"});
        case (!description):
            return res.status(400).json({error : "Description is required!"})
        case (!price):
            return res.status(400).json({error : "Price is required!"})
        case (!quantity):
            return res.status(400).json({error : "Quantity is required!"})
        case (!category):
            return res.status(400).json({error : "Category is required!"})
        case (!brand):
            return res.status(400).json({error : "Brand is required!"})
    }
    console.log(req.params.id);
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,{...req.fields},{new : true});
    await product.save();
    res.json(product)

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const deleteProduct = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findOneAndDelete(req.params.id);
        if(!product){
            res.status(404).json("something wrong while deleting the product!")
        }
        res.status(200).json(product)

    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Server Error"})
    }
})

const fetchProducts = asyncHandler(async(req,res)=>{
    try {
       const pageSize = 6;
       const keywords = req.query.keyword ? {name : {$regex : req.query.keyword ,$options : "i"}} : {};

       const count = await Product.countDocuments({...keywords});
        const products = await Product.find({...keywords}).limit(pageSize);

        res.status(200)
        .json(
            {
            products,
            page:1,
            pages:Math.ceil(count/pageSize),
            hasMore:false
        }
    )
    } catch (error) {
        console.error(error)
        res.status(500).json({error : "Server Error"})
    }
})

const fetchById = asyncHandler(async(req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (product) {
          return res.json(product);
        } else {
          res.status(404);
          throw new Error("Product not found");
        }
      } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Product not found" });
      }
})

const fetchAllProducts = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.find({}).populate("category").sort({createAt : -1});
        if(!product){
            res.status(404).json("Product not found!")
        }
        res.status(200).json(
            product
        )
    } catch (error) {
        console.log(error.message )
        res.status(500).json("Server Error!")
    }
})

const fetchTopProducts = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.find({}).sort({rating : -1}).limit(6);
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

const fetchNewProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({}).sort({_id: -1}).limit(5);
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

const addProductReview = asyncHandler(async(req,res)=>{
    try {
        const {rating,comment} = req.body;

        const product = await Product.findById(req.params.id)

        const userToken = req.cookies.jwt;
        const decoded = jwt.verify(userToken,process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password")
        const userId = user._id.toString()

        if(product){
            const alreadyReviewed = product.reviews.find((r) => r.user.toString() === userId);
            
            if(alreadyReviewed){
                res.status(404).json({message : "Product is already reviewed!"})
                return;
            }
            const review = {
                name : user.username,
                rating : Number(rating),
                comment,
                user : userId
            }

            product.reviews.push(review)
            product.numReviews = product.reviews.length;
            product.rating =  product.reviews.reduce((acc,item)=>item.rating + acc , 0) / product.reviews.length

            await product.save();

            res.status(200).json("Reviewed Successfully!")
        }else{
           res.status(404).json("Product not find")
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error!")
    }
})

const filterProducts = asyncHandler(async(req,res)=>{
    try {
            const {radio,checked} = req.body;
            let args = {};
            if(checked.length > 0) args.category = checked;
            if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]}

            const products = await Product.find(args)
            res.status(200).json(products);

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
})

export {
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    fetchById,
    fetchAllProducts,
    fetchTopProducts,
    fetchNewProducts,
    addProductReview,
    filterProducts
}