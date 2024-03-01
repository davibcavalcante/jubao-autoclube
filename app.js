const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const viewsRouters = require('./routes/views');
const apiV1Router = require('./routes/api');

const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (!req.secure) {
        // Redireciona para HTTPS
        res.redirect(`https://${req.headers.host}${req.url}${req.query}`);
    } else {
        next(); // Continue com a próxima rota
    }
});

app.use('/', viewsRouters);
app.use('/api/v1', apiV1Router);

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

module.exports = app;
