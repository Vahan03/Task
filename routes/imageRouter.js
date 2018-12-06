const { getImages, editProfilePic,deletImages,deletImages} = require('../models/MongoDb/mongo.js');
const {AuthenticateToken} = require('../middleware/tokenAuthenticator.js');

const configureImageRouter = (router) =>{
    //getting uploaded images
    router.get('/getImages', AuthenticateToken, getImages);
    //changing profile picture
    router.post('/editProfilePic', AuthenticateToken, editProfilePic);
    //delet images
    router.delete('/getImages',AuthenticateToken,deletImages)
    
    console.log('History route configired');

}

module.exports = configureImageRouter;



