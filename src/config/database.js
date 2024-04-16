/**
    * @description      : 
    * @author           : admin
    * @group            : 
    * @created          : 16/04/2024 - 11:14:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2024
    * - Author          : admin
    * - Modification    : 
**/
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;