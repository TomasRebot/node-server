const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');
const CommonResponse = require('../models/commonResponse');


module.exports = {
    login: async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({email:email});
            if(!user) return res.status(401).json(CommonResponse.failLogin());
            bcrypt.compare(password, user.password).then( match => {
                if(match) {
                    let payload = {
                        email : user.email,
                        password: user.password
                    };
                    jwt.sign( payload ,config.getSecret(), (err, token) => {
                        if(err){
                            res.status(403).json(CommonResponse.failLogin(err.message));
                        }else{
                           res.status(200).json(CommonResponse.succededLogin({user:user, token:token}));
                        }
                    });
                }else{
                    return res.status(401).json(CommonResponse.failLogin());
                }
            }).catch(err => {res.status(500).json(CommonResponse.internalError(err))});
        } catch (err) {
            next(err);
        }
    },


    logout: async (req,res,next) => { return next(req)},


};

