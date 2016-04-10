var express = require('express'),
  app = express(),
  path = require('path');
var routes = require('routes');
var bodyParser = require('body-parser');
var pg = require('pg');
var dbFunctions = require('./controllers/dbFunctions.js');

//controllers
var homeController = require('./controllers/home');
var signupController = require('./controllers/signup');

app.set('views', path.join(__dirname, 'views'));
var bodyParser = require('body-parser');
app.use(bodyParser.text({type: 'text/html'}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));

// Force SSL
/* At the top, with other redirect methods before other routes */
app.enable("trust proxy")
function ensureSecure(req, res, next){
  if(req.secure){
    // OK, continue
    return next();
  };
  res.redirect('https://'+req.hostname+req.url); // handle port numbers if you need non defaults
};

app.all('*', ensureSecure); // at top of routing calls

//Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/home.html');
});
app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/views/signup.html');
});
app.get('/confirmation', function(req, res) {
  res.sendFile(__dirname + '/views/confirmation.html');
});

//Form Route
app.post('/submit', function(req, res){
    console.log("submit clicked");
})

//Database Routes
app.get('/db/readRecords', function(req, res){
    dbFunctions.getRecords(req,res);
});
app.get('/db/addRecord', function(req, res){
    dbFunctions.addRecord(req,res);
});
app.get('/db/delRecord', function(req, res){
    dbFunctions.delRecord(req,res);
});
app.get('/db/createTable', function(req, res){
    dbFunctions.createTable(req,res);
});
app.get('/db/dropTable', function(req, res){
    dbFunctions.dropTable(req,res);
});

// start default server
app.listen(process.env.PORT || 1337, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
