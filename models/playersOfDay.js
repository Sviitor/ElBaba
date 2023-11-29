const mongoose = require('mongoose');

const playersOfDaySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  regularPlayers: [{
    name: {
      type: String,
      required: true,
    },
    chegada: {
      type: Number,
      required: true,
    },
    position: {
        type: String
        
      },
    team: {
        type: Number
    },
    pontos: {
      type: Number
  }

  }],
  visitorPlayers: [{
    name: {
      type: String,
      required: true,
    },
    chegada: {
      type: Number,
      required: true,
    },
    position: {
        type: String

      },
    team: {
        type: Number 
    },
    pontos: {
      type: Number
  }

  }],

});

module.exports = mongoose.model('PlayersOfDay', playersOfDaySchema);