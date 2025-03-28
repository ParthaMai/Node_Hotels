const mongoose=require('mongoose');

// Define the person Schema
const personSchema= new mongoose.Schema ({
    name: {
        type: String,
        require: true // means this is mandatory to fill in the document.
    },
    age : {
        type: Number // here this is not require means this is not mandatory to fill it the document.
    },
    work:{
        type: String,
        enum: ['chef','Waiter','Manager'], // enum: means only accept the this 3 parameters. otherwise not accepted.
        require: true
    },
    mobile:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true //means email always unique .
    },
    address:{
        type:String
    },
    salary:{
        type: Number,
        require: true
    }
});

// Create person model

const person=mongoose.model('person',personSchema);
module.exports = person;