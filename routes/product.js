const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

// middlewares
const auth = require('../middlewares/auth')

// model
const Product = require('../model/Product')

// @route GET api/product
// @desc get user list
// @access Public
router.get('/', async (req, res) => {

    // pagination ( test -> Postman: localhost:8000/api/user?page=2&limit=3 )
    const page = parseInt(req.query.page || 1) 
    const limit = parseInt(req.query.limit || 10)
    const startOffset = (page -1) * limit
    // page = 1 -> (1-1) * 10 -> 0
    // page = 2 (2-1) * 10 -> 10

    const endOffset = startOffset + limit
    // page = 1 -> 0 + 10 => 10
    // page = 2 -> 10 + 10 => 20

    try {
        const products = await Product.find().sort({data: -1});
        const total = products.length
        const result = {
            data: products,
            page,
            limit,
            total,
            isSuccess: true
        }
        if (total===0) return res.status(200).json(result)
        result.data = products.slice(startOffset, endOffset)
        // page = 1 -> users.slice(0,10)
        // page = 2 -> users.slice(10, 20)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({
            msg: 'Server Error',
            isSuccess: false
        })
    }
})