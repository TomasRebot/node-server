const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = (req, res, next) => {
    if(req.path !== '/api/auth/login' && req.path !== '/api/users/create' && req.path !== '/api/users'){
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, config.secretKey, (err, decoded) => {
                if(err) return res.status(403).json({message:'error comparing jwt',error : err.message});
                next();
            });
        }else res.status(403).json({message:'forbidden, full authorization is required.'})
    }else next();
};