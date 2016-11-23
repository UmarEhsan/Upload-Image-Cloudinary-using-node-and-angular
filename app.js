

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var dbConfig = require('./Server/config/database');
require('./Server/config/passport');

// Create the database connection

var routes = require('./Server/routes/routes.js');





app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

 app.get('/', function (req, res,next) {
   console.log("user connected");

   if (req.headers['user-agent'].match(/\bmob/i))  {

     app.set('views', path.join(__dirname, '../client/www'));
     app.engine('html', require('ejs').renderFile);
     app.use(express.static(path.join(__dirname, '../client/www')));
     next();

   } else {
     app.set('views', path.join(__dirname, '/public/web'));
     app.engine('html', require('ejs').renderFile);
     app.use(express.static(path.join(__dirname, '/public/web')));
     next();
   }
});

// app.listen(3000, function () {
//   // var port = app.address().port;
//
//   console.log("App now running on port", 3000);
// });
app.use('/', routes());
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
// app.listen(process.env.PORT || 8080, function () {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });
var port = process.env.PORT || 9090;


app.listen(port, function () {
  // var port = app.address().port;

  console.log("App now running on port", port);
});
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbConfig.url);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

var gracefulExit = function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB :' +  dbConfig.url + ' is disconnected through app termination');
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

try {

  mongoose.connect( dbConfig.url );

  console.log("Trying to connect to DB " +  dbConfig.url);

} catch (err) {

  console.log("Sever initialization failed ", err.message)
};

