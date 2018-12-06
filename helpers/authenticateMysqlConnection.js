//Module for checking the connection between Nodejs Server and MySQL database
const errorHandler = require('./errorhandler.js');

module.exports = async (connection) => {
  try {
    await connection.authenticate();
    console.log('Connected to MySQL database');
  } catch (e) {
    errorHandler('Unable to connect to MySQL database','connection.authenticate','authcon.js',__dirname);
  }
}
