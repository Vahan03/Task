const {login,signout,signup} = require('../service/BasicLogic/user.js');
const {AuthenticateToken} = require('../middleware/tokenAuthenticator.js');

const configureUserRouter = (router)=>{
    //Sign up route
    router.post('/api',signup);
    //Sign in route
    router.post('/signin', login);
    //Sign out route
    router.get('/signout', AuthenticateToken, signout);

    console.log('User router configured');
}

module.exports = configureUserRouter;
