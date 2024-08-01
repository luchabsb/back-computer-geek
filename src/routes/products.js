import { Router } from "express"
import { getProducts, getProduct, getProductsNews, createProducts, updateProducts, deleteProducts } from "../controllers/products.js"

import { verifyToken, isAdmin, isVisualizer } from "../middlewares/authJwt.js" 

const router = Router()

router.get('/products', getProducts)

router.get('/products/:id', getProduct)

router.get('/productsNews', getProductsNews)

router.post('/products', [verifyToken, isAdmin], createProducts)

router.patch('/products/:id', [verifyToken, isAdmin], updateProducts)

router.delete('/products/:id', [verifyToken, isAdmin], deleteProducts)

export default router