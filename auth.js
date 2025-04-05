
const passport=require('passport'); // require means import the file or any package.
const LocalStrategy=require('passport-local').Strategy;
const person = require('./models/person');


passport.use(new LocalStrategy(async(UserName,password,done)=>{
  //authentication logic here
  try{
      console.log('Received Credentials:',UserName,password);
      const user= await person.findOne({username:UserName});
      if(!user)
      {
         return done(null,false,{ message: 'Incorect Username'});
      }
      const isPaswordMatch= await user.comparePassword(password); // === strict equality check // comaprePassword functin call in person.js
      if(isPaswordMatch)
      {
        return done(null,user);
      }
      else{
        return done(null,false,{message:'Incorrect Password'});
      }
  }
  catch(err){
      return done(err);
  }
}));


module.exports=passport;
