const { Router } = require('express');
const router = Router();

router.route('/')
    .get((req,res ,next) => {
        res.status(200).json({
            "resource": "Home",
            "message": "You requested api index page",
            "data" : []
        });
    })
    .post();

module.exports = router;