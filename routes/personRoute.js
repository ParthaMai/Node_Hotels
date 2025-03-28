const express = require('express');
const router =express.Router();
const person=require('./../models/person'); // ../ means two folder pi6ee save a6e bole


// post route to add a person
router.post('/', async(req,res)=>{

    try{

    const data=req.body;

    // create a newperson and copy the data which is user input in data=req.body;
    const newPerson = new person(data);

    // save the newPerson to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:"Internal Server Error"});

    }

});

//to get the data from database(Mongodb)
router.get('/', async(req,res)=>{

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