const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

module.exports = {
    login: async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({email:email});
            if(!user) return res.status(404).json({message: "This records doesn't match with our's records"});
            bcrypt.compare(password, user.password).then( match => {
                if(match) res.status(200).json({
                    message:'Login success',
                    login: true
                });
            }).catch(err => {res.status(500).json(err)});

        } catch (err) {
            next(err);
        }
    },

    logout: async (req,res,next) => {

    },


};

