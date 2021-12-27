import express from 'express'
import { createProducts, getProducts, editProducts, deleteProducts, searchProducts } from '../controllers/products.js'

const router = express.Router()

router.post('/', createProducts)
router.get('/', getProducts)
router.get('/:id', searchProducts)
router.patch('/:id', editProducts)
router.delete('/:id', deleteProducts)

export default router
