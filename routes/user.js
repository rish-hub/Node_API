const usercontroller = require('./../Controllers/userController')
var passport = require('passport');

module.exports = (router) => {
    
    /**
     * adds/register a user
     * Public Routes
     */
    router
        .route('/user/registerUser')
        .post(usercontroller.registerUser)

    /**
     * get  tests Public Route
     * Public Routes
     */
    router
        .route('/user/test')
        .get(usercontroller.test)

    /**
     * Login a user
     * Public Routes
     */
    router
        .route('/user/login')
        .post(usercontroller.loginUser)

     
    router
    .route('/user')
    .get(passport.authenticate('jwt',{sesson:false}),usercontroller.getCurrentUser)
    
     
}