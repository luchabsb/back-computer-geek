import { Router } from "express"
import { getOrderDetails, getOrderDetail, createOrderDetails, updateOrderDetails, deleteOrderDetails } from "../controllers/orderDetails.js"

const router = Router()

router.get('/orderDetails', getOrderDetails)

router.get('/orderDetails/:id', getOrderDetail)

router.post('/orderDetails', createOrderDetails)

router.patch('/orderDetails/:id', updateOrderDetails)

router.delete('/orderDetails/:id', deleteOrderDetails)

export default router