const passport = require('passport');

const user = require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'role-base-app';

passport.use(new JwtStrategy(opts,async function (jwt_payload,done){
    try{
        let userData = await user.findOne({id : jwt_payload.payload.id});
        if(userData)
        {
            return done(null,userData);
        }
        else{
            return done(null,false); 
        }
    }catch(err)
    {
        console.log(err);
        return false;
    }
}));