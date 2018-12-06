const MongoClient = require('mongodb').MongoClient;
const findUserById = require('./findUserById.js');
const errorHandler = require('../../helpers/errorhandler.js');
const fs = require('fs')
const request = require('request')
//Getting configuration constrants
const {
  MONGO_DATABASE_NAME,
  MONGO_DATABASE_HOST,
  MONGO_DATABASE_USER_NAME,
  MONGO_DATABASE_PASSWORD
} = require('../../constants/constants.js')




if(MONGO_DATABASE_PASSWORD){
  url = `mongodb://${MONGO_DATABASE_USER_NAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_DATABASE_HOST}`;
}else{
  url = `mongodb://localhost:27017`
}

let db;



//Connect to mongodb database
MongoClient.connect(url,{useNewUrlParser:true}, function(err,client){
  if(err){
    console.log()
    errorHandler('Unable to connect to MongoDB','MongoClient.connect','mongo.js',__dirname);
  }
  const database = client.db(MONGO_DATABASE_NAME);
  const collection = database.collection('Images');
  db = collection;
  console.log('Connected to MongoDb database');
})


//Insterting user object in mongodb database
const mongo = (a) => {
      db.insertOne(a, (err, res) => {
        if (err){
          errorHandler('Error while unserting user object in mongodb','mongo','mongo.js',__dirname);
        }
        console.log("User inserted");
      });
}


//find user object from mongodb database and send back to client
const findAndSendUserInfo = async (id, res, obj) => {
    const user = await findUserById(id, db);
    console.log(user, 'this is mongodb user info');
    obj.profileImage = user.profileImage;
    obj.totalImages = user.totalImages;
    res.send(obj);
}



//updating the number of total images (after image upload) 
const updateImages = async (id, path) => {
    const user = await findUserById(id, db);
    user.images.push(path);
    let number = user.totalImages;
    db.update({
      id: `${id}`
    }, {
      $set: {
        images: user.images,
        totalImages: ++number,
      }
    }, (err, res) => {
      if (err){
        errorhandler('Erro while trying to update images','updateImages','mongo.js',__dirname);
      }
    });
}

//Getting image paths form mongodb database
const getImages = async (req, res) => {
    try{
      req.query.page = parseInt(req.query.page);
      if(!Boolean(req.query.page)){
        res.json(400);
        return;
      }
      const result = await db.find({id: `${req.userId}`})
      .project({images: {$slice: [(req.query.page-1)*3,3]}, totalImages: 1, _id: 0}).toArray();
      console.log(result);
      res.send(JSON.stringify(result));     
    }catch(e){
      console.log(e);
      res.json(503);
      errorHandler('Unable to get images', 'getImages','mongo.js',__dirname)
    }
}
//delete user images
const deleteImages = async (req,res)=>{
  try{
    const result = await db.deleteOne({imagepath : imagepath});
    fs.unlinkSync(`../../user-images/Client${req.userId}/${imagepath}`);
  }catch(e){
    res.json('404');
  }
}



module.exports = {
  mongo,
  findAndSendUserInfo,
  deleteImages,
  updateImages,
  getImages,
  
}
