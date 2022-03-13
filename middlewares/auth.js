const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({
            msg: 'Invalid token',
            isSuccess: false
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Invalid token',
            isSuccess: false
        })
    }
}