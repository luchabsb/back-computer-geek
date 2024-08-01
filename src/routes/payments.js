import { Router } from "express"
import { getPayments, getPayment, createPayments, updatePayments, deletePayments } from "../controllers/payments.js"

const router = Router()

router.get('/payments', getPayments)

router.get('/payments/:id', getPayment)

router.post('/payments', createPayments)

router.patch('/payments/:id', updatePayments)

router.delete('/payments/:id', deletePayments)

export default router