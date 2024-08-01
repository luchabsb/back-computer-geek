import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'
import { pool } from "../db.js"

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).json({ message: "No token provided" })
    } else {
        const decoded = jwt.verify(token, SECRET)
        req.userId = decoded.id

        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [req.userId])
        if (user.length <= 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado'})
  }
}

export const isAdmin = async (req, res, next) => {
    const [user] = await pool.query('SELECT users.email, roles.description as rol FROM users INNER JOIN roles ON users.roleId = roles.id WHERE users.id = ?', [req.userId])
    if (user[0].rol === 'ADMIN') {
        next()
        return
    }
    return res.status(403).json({ message: 'Requiere un rol de admin'})
}

export const isVisualizer = async (req, res, next) => {
    const [user] = await pool.query('SELECT users.email, roles.description as rol FROM users INNER JOIN roles ON users.roleId = roles.id WHERE users.id = ?', [req.userId])
    if (user[0].rol === 'VISUALIZER') {
        next()
        return
    }
    return res.status(403).json({ message: 'Requiere un rol de visualizer'})
}