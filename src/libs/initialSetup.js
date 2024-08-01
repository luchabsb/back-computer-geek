import { pool } from "../db.js"

export const createRoles = async () => {
    try {
        const [result] = await pool.query('SELECT COUNT(id) as totalRoles FROM roles')
        if (result[0].totalRoles === 0) {
            await pool.query('INSERT INTO roles (description, state) VALUES (?, ?)', ['ADMIN', 1])
            await pool.query('INSERT INTO roles (description, state) VALUES (?, ?)', ['COSTUMER', 1])
        }
    } catch (error) {
        console.error(error)
    }
}