import express from 'express'
import {register,login,logout,getMe} from './auth.controller.js'
import authMiddleware from './auth.middleware.js'
import protect from './auth.middleware.js'

const router = express.Router();

router.post('/register', register);
router.post('/login',login)
router.post('/logout',logout)
router.get('/getprofile',protect,getMe)

export default router