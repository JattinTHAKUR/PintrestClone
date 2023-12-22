var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Express Session Middleware Configuration
app.use(flash());
app.use(expressSession({
  resave: false, 
  saveUninitialized: false,
  secret: '5555'
}));
// Passport Initialization Middleware
app.use(passport.initialize());
// Passport session Middleware
app.use(passport.session());
// Passport Serialization and Deserialization Configuration
passport.serializeUser(usersRouter.serializeUser()); //encrypt and 
passport.deserializeUser(usersRouter.deserializeUser()); //decrypt


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set the port
const port = process.env.PORT || 8000; // Use the environment port or default to 4000

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Corrected export statement
module.exports = app;
