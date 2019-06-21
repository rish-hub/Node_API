const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const config = require('config');
const jwtSecret = config.get('jwtSecret');
 
const opts = {};
opts.jwtFromRequest  = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

module.exports = passport =>{
    passport.serializeUser(function(user, done) {
        done(null, user._id);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        //console.log(jwt_payload)

        User.findById(jwt_payload.id)
        .then(_user=>{ 
            if(_user){
                return done(null, _user )
            } else{
                return done(nul, false)
            }
        })
        .catch(_err=>console.log(_err))
    }));
}
