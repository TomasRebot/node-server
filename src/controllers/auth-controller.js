const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({email:email});
            if(!user) return res.status(404).json({message: "This records doesn't match with our's records"});
            bcrypt.compare(password, user.password).then( match => {
                if(match) {
                    let payload = {
                        email : user.email,
                        password: user.password
                    };
                    jwt.sign( payload ,config.getSecret(), (err, token) => {
                        if(err){
                            res.status(403).json({
                                message: 'forbidden',
                                token: err.message
                            })
                        }else{
                            res.status(200).json({
                                message: 'success',
                                token: 'Bearer '+token,
                            });

                        }
                    });
                }
            }).catch(err => {res.status(500).json(err)});
        } catch (err) {
            next(err);
        }
    },


    logout: async (req,res,next) => {

    },


};

