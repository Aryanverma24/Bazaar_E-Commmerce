import { Category } from "../models/CategoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


const createCategory = asyncHandler (async (req,res) => {
    try {
        const { name } = req.body
        if(!name){
            return res.json({error : "Name is required!"})
        }

        const existingUser = await Category.findOne({name});

        if(existingUser){
            res.status(404).json("Category already existing!")
        }

        const category =await new  Category({name}).save();

         res.status(200).json(category)


    } catch (error) {
        console.error(error)
        return res.status(400).json(error);
    }
})

const updateCategory = asyncHandler(async (req,res)=>{
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
    
        if (!category) {
          return res.status(404).json({ error: "Category not found" });
        }
    
        category.name = name;
    
        const updatedCategory = await category.save();
        res.json(updatedCategory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
 })


const deleteCategory = asyncHandler(async(req,res)=>{
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const listCategory = asyncHandler(async(req,res)=>{
  try {
    const all = await Category.find({});
    res.status(200).json(all);
  } catch (error) {
    res.status(400).json(error.data.message || error.error)
  }
})

const findCategory = asyncHandler(async(req,res)=>{
    try {
        const categoryId = req.params.id;

        if(!categoryId){
            res.status(400).json("cannot get category id")
        }

        const category = await Category.findById(categoryId);

        if(!category){
            res.status(400).json("Category doesn't exist!")
        }
        res.status(200).json(category);

    } catch (error) {
        res.json("Internal server error")
    }
})
export {
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    findCategory
}