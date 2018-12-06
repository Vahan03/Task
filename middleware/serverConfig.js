const express=require("express");
const bodyParser=require("body-parser");
const fileUpload = require('express-fileupload');
const router = require('../routes/router.js');
const {AuthenticateImageToken} = require('../middleware/tokenAuthenticator');

//Server full configuration
module.exports = (app) => {
  app.use('/Client*/*', AuthenticateImageToken);
    app.use(express.static(`${__dirname}\\..\\user-images`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended:false,
    }));
  app.use(fileUpload());
  app.use('/',router);

};
