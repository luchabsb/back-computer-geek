import { pool } from "../db.js"

export const getProducts =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getProductsNews =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE novedades = 1')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getProduct =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Producto no encontrada'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createProducts = async (req, res) => {
    const { name, description, price, stock, image, novedades, categoryId } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO products (name, description, price, stock, image, novedades, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, description, price, stock, image, novedades, categoryId])
        res.send({
            id: rows.insertId,
            name,
            description,
            price,
            stock,
            image,
            novedades,
            categoryId
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updateProducts = async (req, res) => {
    const { id } = req.params
    const { name, description, price, stock, image, novedades, categoryId } = req.body
   try {
        const [ result ] = await pool.query('UPDATE products SET name = IFNULL(?, name), description = IFNULL(?, description), price = IFNULL(?, price), stock = IFNULL(?, stock), image = IFNULL(?, image), novedades = IFNULL(?, novedades), categoryId = IFNULL(?, categoryId)  WHERE id = ?', [name, description, price, stock, image, novedades, categoryId, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Producto no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deleteProducts = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Producto no encontrada'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}