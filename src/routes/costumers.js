import { Router } from "express"
import { getCostumers, getCostumer, createCostumers, updateCostumers, deleteCostumers } from "../controllers/costumers.js"

const router = Router()

router.get('/costumers', getCostumers)

router.get('/costumers/:id', getCostumer)

router.post('/costumers', createCostumers)

router.patch('/costumers/:id', updateCostumers)

router.delete('/costumers/:id', deleteCostumers)

export default router