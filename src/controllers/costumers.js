import { pool } from "../db.js"

export const getCostumers =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM costumers')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getCostumer =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM costumers WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Cliente no encontrado'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createCostumers = async (req, res) => {
    const { firstName, lastName, document, address, postalCode, city, province, telephone, email } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO costumers (firstName, lastName, document, address, postalCode, city, province, telephone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, document, address, postalCode, city, province, telephone, email])
        res.send({
            id: rows.insertId,
            firstName,
            lastName,
            document,
            address,
            postalCode,
            city,
            province,
            telephone,
            email
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updateCostumers = async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, document, address, postalCode, city, province, telephone, email } = req.body
   try {
        const [ result ] = await pool.query('UPDATE costumers SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), document = IFNULL(?, document), address = IFNULL(?, address), postalCode= IFNULL(?, postalCode), city = IFNULL(?, city), province = IFNULL(?, province), telephone = IFNULL(?, telephone), email = IFNULL(?, email) WHERE id = ?', [firstName, lastName, document, address, postalCode, city, province, telephone, email, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Cliente no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM costumers WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deleteCostumers = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM costumers WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Cliente no encontrado'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}