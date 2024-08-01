import { Router } from "express"
import { getCategories, getCategory, createCategories, updateCategories, deleteCategories } from "../controllers/categories.js"

const router = Router()

router.get('/categories', getCategories)

router.get('/categories/:id', getCategory)

router.post('/categories', createCategories)

router.patch('/categories/:id', updateCategories)

router.delete('/categories/:id', deleteCategories)

export default router