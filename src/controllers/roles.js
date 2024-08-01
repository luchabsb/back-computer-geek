import { pool } from "../db.js"

export const getRoles =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getRole =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Rol no encontrado'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createRoles = async (req, res) => {
    const { description, state } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO roles (description, state) VALUES (?, ?)', [description, state])
        res.send({
            id: rows.insertId,
            description,
            state
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updateRoles = async (req, res) => {
    const { id } = req.params
    const { description } = req.body
    const { state } = req.body

   try {
        const [ result ] = await pool.query('UPDATE roles SET description = IFNULL(?, description), state = IFNULL(?, state) WHERE id = ?', [description, state, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Rol no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deleteRoles = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM roles WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Rol no encontrado'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}