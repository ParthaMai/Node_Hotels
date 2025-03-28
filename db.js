const mongoose = require('mongoose');

// define mongodb connection URL // Lecture no 7
const mongoURL= 'mongodb://localhost:27017';

// setup connection
mongoose.connect(mongoURL, {

    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db=mongoose.connection;

// add event listner for database connection

db.on('connected', ()=> {
    console.log("connected to mongoDB server");
});

db.on('erorr', (err) =>{
    console.log('Mongodb connection error : ', err);
});

db.on('disconnected', ()=> {
    console.log('disconnected');
});

//Export the database connection
module.exports=db;