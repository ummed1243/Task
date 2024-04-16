/**
    * @description      : 
    * @author           : admin
    * @group            : 
    * @created          : 04/04/2024 - 14:06:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/04/2024
    * - Author          : admin
    * - Modification    : 
**/
const app = require('./app');
const connectDatabase = require('./config/database');
const PORT = process.env.PORT || 33000;
// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

connectDatabase();

const server = app.listen(PORT, () => {
    console.log(`Server running PORT`,PORT)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
