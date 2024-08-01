import { pool } from "../db.js"
import { encryptPassword, comparePassword } from "../libs/auth.js"
import { SECRET } from "../config.js"
import jwt from 'jsonwebtoken'

export const signUp =  async(req, res) => {
  const { firstName, lastName, email, username, password, roleId, state } = req.body

  const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    if (result.length <= 0) {
      const passwordEncrypted = await encryptPassword(password)
      try {
        const [rows] = await pool.query('INSERT INTO users (username, password, firstName, lastName, email, roleId, state) VALUES (?, ?, ?, ?, ?, ? ,?)', [username, passwordEncrypted, firstName, lastName, email, roleId, state])
        const token = jwt.sign({id: rows.insertId}, SECRET, { 
          expiresIn: 86400
        })
        res.send({
            id: rows.insertId,
            username,
            token,
            passwordEncrypted,
            firstName,
            lastName,
            email,
            roleId,
            state,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error'
        })
    }
    } else {
      return res.status(400).json({
        message: 'El email ingresado ya está en uso'
    })
    }
}

export const signIn =  async(req, res) => {
  const { email, password } = req.body

  const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

  if (result.length <= 0) {
    return res.status(400).json({ message: 'Usuario inexistente'})
  } else {
    const matchPassword = await comparePassword(password, result[0].password)
    if (!matchPassword) {
      return res.status(401).json({ token: null, message: 'Password incorrecta'})
    } else {
      const token = jwt.sign({id: result[0].id}, SECRET, { 
        expiresIn: 86400
      })
      res.json({ token })
    }
  }
}