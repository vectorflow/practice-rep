var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = 'mongodb://localhost/users_table'


mongoose.connect('mongodb://localhost/users'); 

require('./config/passport')(passport);


app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser()); 
app.use(express.static('public'))


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 


require('./app/routes.js')(app, passport); 

app.listen(3000);
console.log('The magic happens on port ' + port);
