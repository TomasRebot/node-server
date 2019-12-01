const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/auth-controller');
//login
router.route('/login')
    .post(AuthController.login);

router.route('/logout')
    .post(AuthController.logout);

module.exports = router;
