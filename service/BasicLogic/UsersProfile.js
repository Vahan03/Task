const mysql = require('sequelize');
const mongod = require('../../models/MongoDb/mongo.js')
const {Users} = require('../../models/MySQL/MySQLTableDefine.js')
const errorHandler = require('../../helpers/errorhandler.js');




//Profile Information sending
const profile = async (req, res, token, userId) => {
    try {
      if (!userId) {
        res.redirect('/login');
        return;
      }
     const user= await Users.findOne({
       where: {   
        id : userId
      },
      raw : true,
    }) 
      
      console.log('User found');
      const obj = {
        name: user.name,
        lastname: user.lastname,
        token: token,
        userId: userId,
      }

      console.log(obj);
      //Find information about specific user in mongo database
      await mongod.findAndSendUserInfo(userId, res, obj);
    } catch (e) {
      res.json(500);
      errorHandler('Unable to retrieve data from MySQL','profile','UsersProfile.js',__dirname);
    }
  }

  //Image upload handler
  const imageUpload = (req, res) => {
      if (!req.files) {
        console.log('No files uploaded');
        res.json(415);
      } else {
        const image = req.files.image;
        image.mv(`./user-images/Client${req.userId}/${req.files.image.name}`, (err) => {
          if (err) {
            res.json(500)
            errorHandler('Unable to save uploaded image','imageUpload','UsersProfile.js',__dirname);
          }
          res.json(201);
          mongod.updateImages(req.userId, `Client${req.userId}/${req.files.image.name}`);
        })
      }
  }

  
   const editProfile = async (req, res) => {
    try {
      const value = req.body;
      await Users.update({
        mail : value.mail,
        name : value.name,
        lastname : value.lastname,
        birthday : value.birthday,
        phone: value.phone
      },
      {where:{id:req.userId}});
      
      console.log('information changed');
      res.json(205);
    } catch (e) {
      res.json(503);
      console.log(e);
      errorHandler('Error happend while changing user data','editProfile','UsersProfile',__dirname);
    }
}

module.exports = {
  profile,
  imageUpload,
  editProfile,
}

//Handling user profile rendering

