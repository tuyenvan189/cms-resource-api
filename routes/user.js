const router = require('express').Router();

// model
const User = require('../model/User')

// @route GET api/user
// @desc get user list
// @access Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({data: -1});
        const result = {
            data: users,
            isSuccess: true
        }
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({
            msg: 'Server Error',
            isSuccess: false
        })
    }
})

module.exports = router;