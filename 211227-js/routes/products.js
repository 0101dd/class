import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.post('/', auth, upload)

export default router
