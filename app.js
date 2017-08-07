var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var load = require("express-load");
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');

mongoose.connect('mongodb://localhost/help');
var db = mongoose.connection;
// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
/*app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
*/
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require('method-override')());
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));



// Secret variable
app.set('superSecret', 'ilovescotchyscotch')
// Express Validator


// Morgan manda logs
app.use(morgan('dev'));
// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

load('models', {cwd: 'app', verbose: true}).then('controllers').then('routes').into(app);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
