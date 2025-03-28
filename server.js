const express = require('express')
const app = express()
const db= require('./db');


const bodyParser= require('body-parser');
app.use(bodyParser.json()); // req body

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

app.listen(3000)