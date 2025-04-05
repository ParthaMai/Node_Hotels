const express = require('express')
const app = express()
const db= require('./db');
require('dotenv').config();
const person = require('./models/person');
const passport=require('./auth'); // import the auth.js passport



const bodyParser= require('body-parser');
app.use(bodyParser.json()); // req body

// middileware Function
const logRequest= (req,res,next) =>{
  console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`); // `` this symbol is back ticks not colon.
  next(); // Move on to the next phase this is mandatory
}
// app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false}); // local middleware

app.get('/', function (req, res) {
  res.send('Welcome to my hotel');
})


//Import the person files
const personRoutes=require('./routes/personRoute');

//Use the routers
app.use('/person',personRoutes);

// Import the menu files
const menuRoutes=require('./routes/menuRoute');


// use the routers
app.use('/menu',menuRoutes);


const PORT=process.env.PORT || 3000;

app.listen(3000)