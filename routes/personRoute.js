const express = require('express');
const router =express.Router();
const person=require('./../models/person'); // ../ means two folder pi6ee save a6e bole

const {jwtAuthMiddleware,generateToken} = require('./../jwt');

// post route to add a person
router.post('/signup', async(req,res)=>{

    try{

    const data=req.body;

    // create a newperson and copy the data which is user input in data=req.body;
    const newPerson = new person(data);

    // save the newPerson to the database
    const response = await newPerson.save();
    console.log('data saved');
    const payload={
      id: response.id,
      username:response.username
    }  

    const token= generateToken(payload); // we want to pass username in payload.
    console.log("Token is : ", token);

    res.status(200).json({response: response, token : token});
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error"});

    }

});
// Login Route
router.post('/login', async(req,res)=>{
  try{
      //Extract username and password form body
      const{username,password}=req.body;

      // Find the user by user name
      const user= await person.findOne({username: username});

      //if user doesnot exist and password does not match, return err
      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:"invailid username or password"});
      }
      const payload={
        id:user.id,
        username:user.username
      }
      const token=generateToken(payload);

      // return token as response
      res.json({token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"internal server error"});
  }
});


//to get the data from database(Mongodb)
router.get('/',jwtAuthMiddleware, async(req,res)=>{

    try{
      const data= await person.find();
      console.log('data Fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"internal server Error"});
    }

});


// // parameterized API calls
router.get('/:worktype',async (req,res)=>{
  try{
      const worktype=req.params.worktype;
      if(worktype== 'chef' || worktype == 'Manager' || worktype == 'Waiter'){
        const response = await person.find({work: worktype});
        console.log("response Fetched");
        res.status(200).json(response);

      }
      else{
        res.status(404).json({error:"Invalid Work type"});
      }
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Internal server Error"});
  }
});

// for update the value 
router.put('/:id', async(req,res)=>{
  try{
    const personId=req.params.id; // extract the from the url
    const updatePersonData=req.body; // update data for the person

    const response = await person.findByIdAndUpdate(personId,updatePersonData,{
      new: true, //  return the update document
      runValidators: true, // Run mongoose validatin means check the person scehma
    })
    if(!response)
    {
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data Updated');
    res.status(200).json(response);
  }
  catch(err){
      console.log(err);
      res.status(404).json({error:"Internal server error"});
  }
})


// for delete the value
router.delete('/:id', async(req,res)=>{
  try{
      const personId=req.params.id;

      const response= await person.findByIdAndDelete(personId);
      if(!response)
        {
          return res.status(404).json({error:'Person not found'});
        }
        console.log('data Updated');
        res.status(200).json({message: ' person deleted Succesfully'});
  }
  catch(err){
    console.log(err);
    res.status(404).json({error:"Internal server error"});
  }
})
module.exports=router;