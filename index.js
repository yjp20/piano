//NPM
global.express = require('express');

//custom
global.config = require('./config.json');

var app = express();

app.use('/piano/test', express.static('public/jasmine'));
app.use('/piano', express.static('public'));
app.get('/', function(req,res){
  res.redirect('/piano');
  res.end();
})

app.listen(config.port, function () {
  console.log("Connected to port: " + config.port + " on " + config.private_ip);
});
