
var createError = require('http-errors'); // for handling the http error by express
var express = require('express'); // imports framework.
var path = require('path'); // core node module for working and handling paths.
var cookieParser = require('cookie-parser'); // Helps to handle cookies.
var bodyParser = require('body-parser'); // extracts methods parameter and add a body object to the request. 
var logger = require('morgan'); // middleware for logging requests and responses.

var passport = require('passport'); // A middleware for authentication of users.
var authenticate = require('./authenticate'); // authentication strategy defined.

var indexRouter = require('./routes/index');  // Test route generated by express.
var userRouter = require('./routes/userRouter');  // User route which handles login, logout, signup, etc. user related task.
var medicineRouter = require('./routes/medicineRouter');  // Medicine route which handles CRUD operation of medicine schema

var healthPostRouter= require('./routes/healthPostRouter');
var vaccineRouter = require('./routes/vaccineRouter');
var suppliersRouter = require('./routes/suppliersRouter');
var bloodRouter = require('./routes/bloodRouter');
var orderRouter = require('./routes/orderRouter');
var droneRouter = require('./routes/droneRouter');

var mongoose = require('mongoose'); // Mongoose to interact with mongodb database
var mongoose_init = require('./models/db'); // Initialiation/connection with mongodb database


var app = express();  // Initialized a express application

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Connect the express to render the template present in views folder.
app.set('view engine', 'jade'); // jade as View engine to be used.

app.use(logger('dev')); // Logging of request in the 
app.use(bodyParser.json()); // puts data in request.body from POST request
app.use(bodyParser.urlencoded({ extended: false }));  // puts data in request.query from GET request(or form url)

app.use(passport.initialize());
 // Initialize passport to use as a middleware.


app.use(express.static(path.join(__dirname, 'public')));  // static file to be linked and accessed from public folder.

// initialized all routers
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/medicines', medicineRouter);
app.use('/healthpost',healthPostRouter);
app.use('/vaccine',vaccineRouter);
app.use('/suppliers',suppliersRouter);
app.use('/blood',bloodRouter);
app.use('/orders',orderRouter);
app.use('/drone',droneRouter);

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
  res.json({
    status: false,
    message: err.message
  });
  // res.render('error');
});


module.exports = app;
