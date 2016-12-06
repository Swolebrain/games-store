const express = require('express');
const app = express();
const PORT = 3005;
const routes = require('./Games.js');

app.get('/', function(req, res){
  res.send("hello");
});

app.get('/all', routes.getAll);

app.listen(PORT, function(){
  console.log('app listening on port '+PORT);
});
