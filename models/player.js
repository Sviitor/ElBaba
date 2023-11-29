const mongoose = require('mongoose');  

const playerSchema = new mongoose.Schema({
    name: {type: String, required:true},  
    imgURL: {type: String, default: ''},
    monthlyScores: [
        {
            month: { type: Number},
            days: [{
                date: {type: String},
                team: {type: Number},
                position: {type: String},
                arrived: {type: Number },
                victories: {type: Number},
                ties: {type: Number},
                points: {type: Number},
                gols: {type: Number},
                negPoints:{type: Number},
                yellowCards: { type: Number},
                redCards: { type: Number },
                blueCards: { type: Number }
           }]
        }
    ]
});  



module.exports = mongoose.model('Player', playerSchema);  