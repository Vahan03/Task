
const router = require('express').Router();
const configureImageRouter = require('./imageRouter.js');
const configureProfileRouter = require('./profileRouter.js');
const configureUserRouter = require('./userRouter.js');


configurePasswordReset(router);
configureImageRouter(router);
configureProfileRouter(router);
configureUserRouter(router);


module.exports = router;
