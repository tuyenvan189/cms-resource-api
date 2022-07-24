const router = require('express').Router();
const { check, validationResult } = require('express-validator');

// middlewares
// const auth = require('../middlewares/auth')

// model
const Product = require('../model/Product')

// @route GET api/product
// @desc get product list
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

// @route    POST api/product
// @desc     Add new product
// @access   public
router.post('/add', [ 
  check('sub_name', 'Sub Name is required').not().isEmpty(),
  check('name', 'name is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('image', 'Image is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { image, sub_name, name, price, promo_price } = req.body;

  console.log(req.body)
  const newProduct = new Product({
    sub_name,
    name,
    price,
    promo_price,
    image,
  })

  try {
    const product = await newProduct.save();
    res.status(200).json({
      data: product,
      msg: 'Add successfully!',
      isSucess: true
    })
  } catch(err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false
    })
  }
})

// @route    GET api/product/:id
// @desc     GET Product
// @access   Public
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json({
      data: product,
      isSucess: true
    })
  } catch(err) {
    res.status(400).json({
      msg: 'Photo not found',
      isSucess: false
    })
  }
})

// @route    PUT api/product
// @desc     Update Product
// @access   Public
router.put('/edit/:id', [
    check('sub_name', 'Sub Name is required').not().isEmpty(),
    check('name', 'name is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const id = req.params.id;
  const { image, sub_name, name, price, promo_price } = req.body;

  const fields = {};
  if (image) fields.image = image;
  if (sub_name) fields.sub_name = sub_name;
  if (name) fields.name = name;
  if (price) fields.price = price;
  if (promo_price) fields.promo_price = promo_price;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { $set: fields },
      { new: true }
    );
    if(!product) {
      return res.status(400).json({
        data: 'Photo not found',
        isSucess: false
      })
    }
    res.status(200).json({
      msg: 'Update successfully!',
      isSucess: true
    })
  } catch(err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false
    })
  }
})

// @route    DELETE api/product
// @desc     Delete Product
// @access   Public
router.delete('delete/:id', async (req, res) => {
  const productId = req.params.id;
  
  try {
    const product = await Product.findOneAndRemove({ _id: productId });
    if(!product) {
      return res.status(400).json({
        msg: `Product not found`,
        isSucess: false
      })
    }
    res.status(200).json({
      msg: 'Delete successfully!',
      isSucess: true
    })
  } catch(err) {
    res.status(500).json({
      msg: `Server Error`,
      isSucess: false
    })
  }
})

module.exports = router;
