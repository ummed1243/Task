/**
    * @description      : 
    * @author           : admin
    * @group            : 
    * @created          : 16/04/2024 - 10:45:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2024
    * - Author          : admin
    * - Modification    : 
**/
const express = require('express');
const { registerUser, loginUser, logoutUser, getUserDetails } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/user_actions/auth');

const router = express.Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

module.exports = router;