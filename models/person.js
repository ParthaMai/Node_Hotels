const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

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
    },
    username:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    }
});

personSchema.pre('save', async function(next) {
    const person=this; // fetch all the data in person var

    // Hash the passport only if it has benn modified or if it is new
    if(!person.isModified('password'))
        return next(); // any changes in password means any modified or new password then if condition false.

    try{
        // hash pasword generation
        const salt=await bcrypt.genSalt(10); // 10 is the how many words added in original password. this number is your choice but gave bigger number then hashing algo should be slowdown.
        
        // hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        // overide the original password to hashed password
        person.password= hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword= async function(candidatePassword){ // this is use in authentication path

    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

// Create person model
const person=mongoose.model('person',personSchema);
module.exports = person;