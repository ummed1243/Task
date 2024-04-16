/**
    * @description      : 
    * @author           : admin
    * @group            : 
    * @created          : 16/04/2024 - 10:45:55
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2024
    * - Author          : admin
    * - Modification    : 
**/
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const asyncErrorHandler = require('../helpers/asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({
            success: 'error',
            message: 'Please Login to Access'
          });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});
