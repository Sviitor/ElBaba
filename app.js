const express = require( 'express');
const cors = require('cors');
const app =  express();
const bodyparser = require("body-parser");  
const playermodel = require("./models/player");
const Partidas = require("./models/partidas");
const mongoose = require('mongoose');  
const addPlayerRoutes = require('./routes/add-player');
const fs = require('fs');
const file = fs.readFileSync('./2383CFD4465ABA418F253EF8BAA200EF.txt')

mongoose.connect("mongodb+srv://saulovitorabreu:qdsawert@baba.kpflklg.mongodb.net/")
.then(()=>{  
    console.log("Connected to database");  
  })  
  .catch(()=>{  
    console.log("Connection Failed");  
  });  
app.use(bodyparser.json());  
app.use(cors()); 
app.use((req, res, next)=>{ 
    res.setHeader("Access-Control-Allow-Origin", "*");   
    res.setHeader(  
        "Access-Control-Allow-Headers",  
        "Origin, X-Requested-With, Content-Type, Accept");  
    res.setHeader("Access-Control-Allow-Methods",  
        "GET, POST, PATCH, DELETE, OPTIONS"); 
    next();  
});  
app.get('/.well-known/pki-validation/2383CFD4465ABA418F253EF8BAA200EF.txt', (req , res) =>{
    res.sendFile(/home/ec2-user/ElBaba/ElBaba/2383CFD4465ABA418F253EF8BAA200EF.txt);
});
 app.use('/api/players', addPlayerRoutes);





module.exports = app;

