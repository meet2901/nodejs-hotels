const passport=require('passport')
const localStrategy = require('passport-local').Strategy;
const Person=require('./models/Person')

passport.use(new localStrategy(async(USERNAME,password,done)=>{
    try {
        const user=await Person.findOne({username:USERNAME});
        if (!user){
            return done(null,false,{message:"Incorrect username"});
        }
        const isMatch=await user.comparePassword(password)
        if (!isMatch){
            return done(null,false,{message:"Incorrect password"});
        }
        else{
            return done(null,user,{message:"password message"});
        }
    } catch (error) {
        return done(error);
    }
}))

module.exports=passport;