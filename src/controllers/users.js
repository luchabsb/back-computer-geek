import { pool } from "../db.js"

export const getUsers =  async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const getUser =  async(req, res) => {
   try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}

export const createUsers = async (req, res) => {
    const { firstName, lastName, document, address, postalCode, city, province, telephone, email, username, password, roleId, state } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO users (username, password, firstName, lastName, document, address, postalCode, city, province, telephone, email, roleId, state) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,?)', [username, password, firstName, lastName, document, address, postalCode, city, province,telephone,email, roleId, state])
        res.send({
            id: rows.insertId,
            username,
            password,
            firstName,
            lastName,
            document,
            address,
            postalCode,
            city,
            province,
            telephone,
            email,
            roleId,
            state,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
}

export const updateUsers = async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, document, address, postalCode, city, province, telephone, email, username, password, roleId, state } = req.body
   try {
        const [ result ] = await pool.query('UPDATE users SET username = IFNULL(?, username), password = IFNULL(?, password), firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), document = IFNULL(?, document), address = IFNULL(?, address), postalCode = IFNULL(?, postalCode), city = IFNULL(?, city), province = IFNULL(?, province), telephone = IFNULL(?, telephone), email = IFNULL(?, email), roleId = IFNULL(?, roleId), state = IFNULL(?, state) WHERE id = ?', [username, password, firstName, lastName, document, address, postalCode, city, province, telephone, email, roleId, state, id]) 
        if (result.affectedRows === 0) return res.status(404).json({
            messagge: 'Usuario no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        res.json(rows[0])
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}   

export const deleteUsers = async (req, res) => {
   try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
        res.sendStatus(204)
   } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
   }
}