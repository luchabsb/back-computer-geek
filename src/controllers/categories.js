import { pool } from "../db.js"

export const getCategories =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getCategory =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Categoría no encontrada'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createCategories = async (req, res) => {
    const { name, state } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO categories (name, state) VALUES (?, ?)', [name, state])
        res.send({
            id: rows.insertId,
            name,
            state
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updateCategories = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const { state } = req.body

   try {
        const [ result ] = await pool.query('UPDATE categories SET name = IFNULL(?, name), state = IFNULL(?, state) WHERE id = ?', [name, state, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Categoría no encontrada'
        })

        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deleteCategories = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Categoría no encontrada'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}