var express = require('express'),
app = express(),
path = require('path');

var routes = require('routes');
var bodyParser = require('body-parser');

// start default server
app.listen(process.env.PORT || 1337, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
