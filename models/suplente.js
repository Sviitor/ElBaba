const mongoose = require('mongoose');

const suplenteSchema = new mongoose.Schema({
  name: String,
  team: Number,
  position: String,
  arrived: Number,
});

const listaSuplenteSchema = new mongoose.Schema({
  date: String,
  suplentes: [suplenteSchema], // Embedding the 'Suplente' schema as an array
});

const ListaSuplente = mongoose.model('ListaSuplente', listaSuplenteSchema);

module.exports = ListaSuplente;