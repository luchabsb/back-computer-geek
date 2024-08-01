import { Router } from "express"
import { getRoles, getRole, createRoles, updateRoles, deleteRoles } from "../controllers/roles.js"

const router = Router()

router.get('/roles', getRoles)

router.get('/roles/:id', getRole)

router.post('/roles', createRoles)

router.patch('/roles/:id', updateRoles)

router.delete('/roles/:id', deleteRoles)

export default router