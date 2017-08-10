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

mongoose.connect('mongodb://luisedtei:poltrona159@ds125113.mlab.com:25113/help');
//mongoose.connect('mongodb://localhost:27017/help');
var db = mongoose.connection;
// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'), {index:false});
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require('method-override')());
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

// Secret variable
app.set('superSecret', 'ilove')
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


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
