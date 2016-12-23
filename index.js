const express = require('express');
const app = express();
const PORT = 3005;
const routes = require('./Games.js');
const bodyParser = require('body-parser');

app.use(  bodyParser.urlencoded({extended: true})  );
app.use( bodyParser.json() );

app.get('/', function(req, res){
  res.send("hello");
});

app.get('/games', routes.getAll);

app.post('/games', routes.newGame);

app.put('/games/:id', routes.updateGame);

app.delete('/games/:id', routes.delete);

app.listen(PORT, function(){
  console.log('app listening on port '+PORT);
});

module.exports = app;
