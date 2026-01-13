const express = require("express");
require('dotenv').config();

const cors = require('cors');
const { Sequelize, Model, DataTypes } = require("sequelize");
const createError = require('http-errors');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const auteurManyRoutes = require('./routes/auteurmany.route');

const auteurHasONeRoutes = require('./routes/author.route');

const auteurMtmRoutes = require('./routes/mtm.route');


const app = express();
app.use(cors({
  origin: [
    'http://localhost:4200'
    ]
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ===================== ROUTES ===================== */

app.use('/', indexRouter);


app.use('/auteurmany', auteurManyRoutes);

app.use('/author', auteurHasONeRoutes);

app.use('/mtm', auteurMtmRoutes);

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

//Url test added here all get and post
/*
app.all("/*", function(req, res, next){

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
 

});
*/


module.exports = app;
