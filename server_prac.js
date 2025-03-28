const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Welcome to my hotel....How i can help you?');
})
app.get('/biriyani', (req,res)=>{
    res.send("Sure sir, i would like to serve biriyani");
})
app.get('/tikka', (req,res) =>{
    var customized_tikka={
        name : "tikka kabab",
        name2: "Reshmi kabab",
        name3 :"hariyali kabab",
        size1 : "half plate",
        siz2 : "Full plate",
        is_chatni : "Green Chatni" 
    }
    res.send( customized_tikka);
})
app.post('/juice',(req,res)=>{
    res.send("data is saved");
    console.log("yes it is work");
})

app.listen(3000)