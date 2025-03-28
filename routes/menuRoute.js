const express = require('express');
const router = express.Router();
const menu=require('./../models/menu'); // ../ means two folder pi6ee save a6e bole


// post route to add a person
router.post('/', async(req,res)=>{

    try{

    const data=req.body;

    // create a newperson and copy the data which is user input in data=req.body;
    const newPerson = new menu(data);

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



router.get('/', async(req,res)=>{

    try{
        const data = await menu.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({error:"Internal server error"});
    }

});

module.exports=router;