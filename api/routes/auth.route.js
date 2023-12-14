import express from 'express'
import {signUp,signIn, deleteUser} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.delete('/delete',deleteUser)

export default router