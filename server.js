var express = require('express'),
app = express(),
path = require('path');
var routes = require('routes');
var bodyParser = require('body-parser');
var pg = require('pg');

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

//Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/views/signup.html');
});

//Database

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

// start default server
app.listen(process.env.PORT || 1337, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
