import express from 'express'
import { pool } from './db.js'
import categoriesRoutes from './routes/categories.js'
import productsRoutes from './routes/products.js'
import ordersRoutes from './routes/orders.js'
import ordeDetailsRoutes from './routes/orderDetails.js'
import costumersRoutes from './routes/costumers.js'
import paymentsRoutes from './routes/payments.js'
import rolesRoutes from './routes/roles.js'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'

import { PORT } from './config.js'
import { createRoles } from './libs/initialSetup.js'

const app = express()

createRoles()

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(express.json())

app.get('/ping', async (req, res) => {
    const [result] = await pool.query('SELECT "PONG" AS result')
    res.json(result)
})

app.use('/api/', categoriesRoutes)
app.use('/api/', productsRoutes)
app.use('/api/', ordersRoutes)
app.use('/api/', ordeDetailsRoutes)
app.use('/api/', costumersRoutes)
app.use('/api/', paymentsRoutes)
app.use('/api/', rolesRoutes)
app.use('/api/', usersRoutes)
app.use('/api/auth/', authRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint incorrecto'
    })
})

app.listen(PORT)