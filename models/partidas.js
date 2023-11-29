const mongoose = require('mongoose');  

const partidasSchema = new mongoose.Schema({
    date: { type: String, required: true},
    
    partidas: [{
        timeA: { type: Number, required: true},
        timeB: { type: Number, required: true},
        golsTimeA: { type: Number, required: true},
        golsTimeB: { type: Number, required: true}
    }]
});  



module.exports = mongoose.model('Partidas', partidasSchema);  