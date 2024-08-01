import { pool } from "../db.js"

export const getOrders =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getOrder =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Pedido no encontrado'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createOrders = (req, res) => {
    try {
        let response = []
        let aux
        req.body.forEach(async order => {
            const { receipt, total, costumerId, paymentId, state } = order
            const [rows] = await pool.query('INSERT INTO orders (receipt, total, costumerId, paymentId, state) VALUES (?, ?, ?, ?, ?)', [receipt, total, costumerId, paymentId, state])
            const [result] = await pool.query('SELECT * FROM orders WHERE id = ?', [rows.insertId])
            res.json(result[0])
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updateOrders = async (req, res) => {
    const { id } = req.params
    const { receipt, total, costumerId, paymentId, state } = req.body
   try {
        const [ result ] = await pool.query('UPDATE orders SET receipt = IFNULL(?, receipt), total = IFNULL(?, total), costumerId = IFNULL(?, costumerId), paymentId = IFNULL(?, paymentId), state = IFNULL(?, state)  WHERE id = ?', [receipt, total, costumerId, paymentId, state, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Pedido no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deleteOrders = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Pedido no encontrado'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}