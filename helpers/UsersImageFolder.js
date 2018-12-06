//creating folder for user images
const fs = require('fs');
const errorHandler = require('../helpers/errorhandler.js');

const createFolder = (userId)=>{
    fs.mkdir(`./user-images/Client${userId}/`, (err) => {
    if (err) errorHandler(`Error while creating folder for user ${userId}`, 'createFolder', 'UsersImageFolder', __dirname);
    console.log("Folder created");
  })
}
  module.exports = createFolder;
