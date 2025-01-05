import express from "express";
import formidable from "express-formidable"
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/CheckId.js";
import {
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    fetchById,
    fetchAllProducts,
    fetchTopProducts,
    fetchNewProducts,
    addProductReview
} from '../controllers/ProductController.js'

const router = express.Router();

router.route("/")
.post(authenticate,authorizeAdmin,formidable(),addProduct)
.get(authenticate,fetchProducts);

router.route("/allProducts").get(fetchAllProducts);

router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);

router.route("/:id/reviews").post(authenticate,authorizeAdmin,checkId,addProductReview);

router.route("/:id")
.put(authenticate,authorizeAdmin,formidable(),updateProduct)
.get(fetchById)
.delete(authenticate,authorizeAdmin,deleteProduct);


export default router;