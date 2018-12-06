const {imageUpload,} = require('../service/BasicLogic/UsersProfile.js');
const {AuthenticateToken,} = require('../middleware/tokenAuthenticator.js');

const configureProfileRouter = (router)=>{
    //Handling image upload
    router.post('/imageUpload', AuthenticateToken, imageUpload);

    console.log('Profile router configured');
}

module.exports = configureProfileRouter;
