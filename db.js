const mongoose = require('mongoose');

// define mongodb connection URL // Lecture no 7
// const mongoURL= 'mongodb://localhost:27017';// this is our local url
const mongoURL = 'mongodb+srv://parthamaity2004:Partha988@cluster0.i5psrhz.mongodb.net/'

// setup connection
mongoose.connect(mongoURL, {

    // useNewUrlParser : true,
    // useUnifiedTopology : true,
})
mongoose.connect(mongoURL)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


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