//Npm modules
const express = require('express');
//Configuration modules
const serverConfig = require('./middleware/serverConfig.js');
const authenticateMysqlConnection = require('./helpers/authenticateMysqlConnection.js');
const { db } = require('./models/MySQL/MySQLTableDefine.js');
//Environmnet configs
const {PORT} = require('./constants/constants.js');

//Server creation and configuration
const app = express();
serverConfig(app);

//Authenticate connection
authenticateMysqlConnection(db);

//Server starting
 app.listen(PORT,()=>{
  console.log(`Listening on port${PORT}`);
});