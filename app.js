const express = require( 'express');
const cors = require('cors');
const app =  express();
const bodyparser = require("body-parser");  
const playermodel = require("./models/player");
const Partidas = require("./models/partidas");
const mongoose = require('mongoose');  
const addPlayerRoutes = require('./routes/add-player');



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

 app.use('/api/players', addPlayerRoutes);





module.exports = app;

