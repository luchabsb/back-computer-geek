import { pool } from "../db.js"

export const getOrderDetails =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orderDetails')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getOrderDetail =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM orderDetails WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Detalle de venta no encontrada'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createOrderDetails = async (req, res) => {
    const { orderId, productId, quantity, price, discount } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO orderDetails (orderId, productId, quantity, price, discount) VALUES (?, ?, ?, ?, ?)', [orderId, productId, quantity, price, discount])
        res.send({
            id: rows.insertId,
            orderId,
            productId,
            quantity,
            price,
            discount
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updateOrderDetails = async (req, res) => {
    const { id } = req.params
    const { orderId, productId, quantity, price, discount } = req.body
   try {
        const [ result ] = await pool.query('UPDATE orderDetails SET orderId = IFNULL(?, orderId), productId = IFNULL(?, productId), quantity = IFNULL(?, quantity), price = IFNULL(?, price), discount = IFNULL(?, discount) WHERE id = ?', [orderId, productId, quantity, price, discount, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Detalle de venta no encontrada'
        })

        const [rows] = await pool.query('SELECT * FROM orderDetails WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deleteOrderDetails = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM orderDetails WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Detalle de venta no encontrada'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}