import express from "express";
import {authenticate,authorizeAdmin} from "../middlewares/authMiddleware.js"
import {
        createOrder ,
        getAllOrders,
        getUserOrder,
        countTotalOrder,
        calculateTotalSales,
        calculateTotalSalesByDate,
        findOrderById,
        markOrderAsPaid,
        markOrderAsDelivered
    } from '../controllers/orderController.js'

const router = express.Router();

router.route('/').post(authenticate,createOrder).get(authorizeAdmin , getAllOrders);
router.route('/mine').get(authenticate,getUserOrder);
router.route('/total-orders').get(countTotalOrder);
router.route('/total-sales').get(calculateTotalSales);
router.route('/total-sales-by-date').get(calculateTotalSalesByDate);
router.route('/:id').get(authenticate,findOrderById);
router.route('/:id/pay').put(authenticate,markOrderAsPaid);
router.route('/:id/deliver').put(authenticate,authorizeAdmin,markOrderAsDelivered);



export default router;