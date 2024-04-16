/**
    * @description      : 
    * @author           : admin
    * @group            : 
    * @created          : 29/09/2023 - 14:28:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 29/09/2023
    * - Author          : admin
    * - Modification    : 
**/
require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const errorMiddleware = require('./middlewares/helpers/error');

const app = express();
console.log("process.env.NODE_ENV",process.env.NODE_ENV);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require('./routes/userRoute');

app.use('/api/v1', user);
// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
// app.use(errorMiddleware);

module.exports = app;