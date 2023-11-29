const express = require('express');
const router = express.Router();
const playermodel = require('../models/player');
const listamodel = require('../models/suplente');

const mongoose = require('mongoose'); 

router.post('/add-player', (req, res, next) => {
    try {
      const newPlayer = new playermodel({
        name: req.body.name,
        imgURL: '',
        monthlyScores: []
      });
      
      newPlayer.save();
  
      console.log(newPlayer);
      res.status(201).json({
        Message: 'Player added successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        Message: 'Error adding player'
      });
    }
  });

  router.get("/get-players",(req, res, next)=>{ 
    playermodel.find()  
    .then((documents)=>{  
        
      res.status(200).json({  
        message: 'Players Fetched Successfully',  
        players: documents  
      });  
    });  
}); 

router.post("/add-monthly-scores", async (req, res, next) => {
  try {
    const currentMonth = new Date().getMonth() + 1;

    const players = await playermodel.find();
    
    for (const player of players) {
      const existingMonth = player.monthlyScores.find(month => month.month === currentMonth);
      if (!existingMonth) {
        player.monthlyScores.push({
          month: currentMonth,
          days: {
            date: '',
            team: 0,
            position: '',
            arrived: 0,
            victories: 0,
            ties: 0,
            points: 0,
            gols: 0,
            negPoints: 0,
            yellowCards:0,
            redCards:0,
            blueCards: 0,

          }
          
        });

        await player.save();
      }
    }

    res.status(201).json({
      Message: 'Monthly scores added to all players'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Message: 'Error adding monthly scores to players'
    });
  }
});

router.put('/update-all', async (req, res) => {
  try {
    const combinedData = req.body;

    if (!combinedData || !combinedData.players || !combinedData.suplentes || !combinedData.date) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    // Separate updated players and suplentes data
    const { players: updatedPlayersData, suplentes: updatedSuplentes, date } = combinedData;

    // Update players as before
    const updatedPlayers = [];
    for (const playerData of updatedPlayersData) {
      const playerId = playerData.id;
      try {
        const updatedPlayer = await playermodel.findByIdAndUpdate(playerId, playerData, {
          new: true,
        });

        if (updatedPlayer) {
          updatedPlayers.push(updatedPlayer);
        } else {
          console.error(`Player with ID ${playerId} not found.`);
        }
      } catch (error) {
        console.error(`Error updating player with ID ${playerId}:`, error);
      }
    }

    // Find an existing ListaSuplente document with the given date
    const existingSuplente = await listamodel.findOne({ date });

    if (existingSuplente) {
      // Update the existing document
      existingSuplente.suplentes = updatedSuplentes;
      await existingSuplente.save();
    } else {
      // Create a new document if it doesn't exist
      const newSuplenteData = new listamodel({
        date: date,
        suplentes: updatedSuplentes,
      });

      await newSuplenteData.save();
    }

    return res.status(200).json({ updatedPlayers });
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:playerId', (req, res, next) => {
  const playerId = req.params.playerId;

  if (!mongoose.Types.ObjectId.isValid(playerId)) {
    return res.status(400).json({ message: 'Invalid player ID format' });
  }

  playermodel.findByIdAndRemove(playerId)
    .then((removedPlayer) => {
      if (!removedPlayer) {
        return res.status(404).json({ message: 'Player not found' });
      }

      res.status(200).json({
        message: 'Player removed successfully',
        removedPlayer: removedPlayer
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Failed to remove the player', error: error.message });
    });
});

router.get('/suplente-for-current-date', async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    const formattedDate = formatDate(currentDate); // Format the date as needed

    const suplenteData = await listamodel.findOne({ date: formattedDate });

    if (!suplenteData) {
      return res.status(404).json({ message: 'Suplente data not found for the current date' });
    }

    return res.status(200).json(suplenteData.suplentes);
  } catch (error) {
    console.error('Error fetching suplente data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
  module.exports = router;