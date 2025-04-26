const jwt = require('jsonwebtoken')

const verifyToken = (token, secret)=>{
    return jwt.verify(token, secret);
}

const authenticate = (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json(
            {
                success: true,
                message: 'User is not authenticated.'
            }
        );
    }
    const token = authHeader.split(' ')[1];

    req.user = verifyToken(token, "JWT_SECRET")
    next()
};

module.exports = authenticate;