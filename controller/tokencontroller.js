const jwt = require('jsonwebtoken');
require('dotenv').config();
const privetKey = process.env.PRIVET_KEY;

exports.getTokenController  = (id , lastName) => {
    token = jwt.sign({ id: id, lastName : lastName, },privetKey,{
        algorithm : 'HS384',
        expiresIn : '1h'
    });

    return token ;
} 

exports.verifyTokenController = (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        res.json({
            "status": "failure",
            "message": "access denied, you need to register",
        });
    } else {
        try {
            result = jwt.verify(token,privetKey);
            next();
        } catch (error) {
            res.json({
                "status": "failure",
                "message": "invalid token",
            });
        }
    }
}


