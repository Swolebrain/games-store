const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/games-store');

const GameSchema = new mongoose.Schema({
  name: String,
  genre: String,
  year: String,
  imageUrls: [String],
  description: String,
  minimumRequirements: {},
  recommendedRequiremens: {},
  price: String,
  hdspace: String,
});


const Game = mongoose.model('Game', GameSchema);

function getAllGames(req, res){
  Game.find()
  .then(function(games){
    res.json(games)
  })
  .catch(err=>res.sendStatus(500));
}

module.exports = {
  getAll: getAllGames
};
