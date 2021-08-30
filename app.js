var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var gameRouter = require('./routes/game');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.path == '/' || req.path == '/auth/login') {
    next();
  } else if (req.path === '/game') {
    if (req.query.isLogin == 'true') {
      next();
    } else {
      res.redirect('/auth/login');
    }
  }
  else if (req.path == '/logout') {
    res.redirect('/');
  }
  else if (req.path == '/auth/user') {
    next();
  }
  else {
    next(createError(404));
  }
})

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/game', gameRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
