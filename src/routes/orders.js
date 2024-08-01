import { Router } from "express"
import { getOrders, getOrder, createOrders, updateOrders, deleteOrders } from "../controllers/orders.js"

const router = Router()

router.get('/orders', getOrders)

router.get('/orders/:id', getOrder)

router.post('/orders', createOrders)

router.patch('/orders/:id', updateOrders)

router.delete('/orders/:id', deleteOrders)

export default router