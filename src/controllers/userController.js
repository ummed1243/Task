/**
    * @description      : 
    * @author           : admin
    * @group            : 
    * @created          : 29/09/2023 - 14:28:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 29/09/2023
    * - Author          : admin
    * - Modification    : 
**/
const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    console.log('registerUser',req.body)
    const { username, email, agreeTerms, password } = req.body;
   

    const user = await User.create({
        username, 
        email,
        agreeTerms,
        password,
    });

    sendToken(user, 201, res);
});


exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    console.log("login api",req.body)

    if(!email || !password) {
        res.status(400).json({
            success: 'error',
            message: 'Please Enter Email And Password'
          });
    }

    const user = await User.findOne({ email}).select("+password");
    if(!user) {
        res.status(401).json({
            success: 'error',
            message: 'Invalid Email or Password'
          });
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        res.status(401).json({
            success: 'error',
            message: 'Invalid Email or Password'
          });
    }
    sendToken(user, 201, res);
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});
