import { Router } from "express"
import { getUsers, getUser, createUsers, updateUsers, deleteUsers } from "../controllers/users.js"

const router = Router()

router.get('/users', getUsers)

router.get('/users/:id', getUser)

router.post('/users', createUsers)

router.patch('/users/:id', updateUsers)

router.delete('/users/:id', deleteUsers)

export default router