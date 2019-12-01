const User = require('../models/user-model');

module.exports = {
    login: async (req, res, next) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({email:email});
            if(email === user.email && password === user.password){
                res.status(200).json({
                    status: true,
                    message: 'login success',
                });
            }else{
                res.status(401).json({
                    status: false,
                    message: "login error, check your's credentials"
                });
            }
        } catch (err) {
            next(err);
        }
    }
};