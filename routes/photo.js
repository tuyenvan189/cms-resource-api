const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator') 

// model
const Photo = require('../model/Photo');

// @route GET api/photo
router.get('/photo', async (req, res) => {
    try {
        const photos = await Photo.find().sort({data: -1});
        const result = {
            data : photos,
            isSuccess: true
        }
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({
            msg: 'Server Error',
            isSuccess: false
        })
    } 
})

// @route POST api/photo/add
router.post('/add', async(req, res) => {
    const id = req.body.id || '';
    const title = req.body.title || '';
    const image = req.body.image || '';
    const description = req.body.description || '';

    // create a new photo
    const photo = new Photo({
        id,
        title,
        image,
        description
    })
    try {
        await photo.save();
        res.json({
            msg: 'Added Successfully!',
            isSuccess: true
        })
    } catch(err) {
        res.status(500).json({
            msg: err,
            isSuccess: false
        })
    }
    console.log('req: ', req.body)
})

module.exports = router;