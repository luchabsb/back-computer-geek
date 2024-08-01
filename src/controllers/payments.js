import { pool } from "../db.js"

export const getPayments =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM payments')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getPayment =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM payments WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Medio de pago no encontrado'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createPayments = async (req, res) => {
    const { description, state } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO payments (description, state) VALUES (?, ?)', [description, state])
        res.send({
            id: rows.insertId,
            description,
            state,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updatePayments = async (req, res) => {
    const { id } = req.params
    const { description, state } = req.body
   try {
        const [ result ] = await pool.query('UPDATE payments SET description = IFNULL(?, description), state = IFNULL(?, state) WHERE id = ?', [description, state, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Medio de pago no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM payments WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deletePayments = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM payments WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Medio de pago no encontrado'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}