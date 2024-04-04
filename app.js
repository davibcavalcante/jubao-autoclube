const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const viewsRouters = require('./routes/views');
const adminViewsRouters = require('./routes/admin-views');
const apiV1Routers = require('./routes/api');
const config = require('./config.json');

const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('adminViews', path.join(__dirname, 'admin', 'admin-views'));

app.use(logger('dev'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'admin')));

if (config.server.useHTTPS) {
  app.use((req, res, next) => {
    if (!req.secure) {
        // Redireciona para HTTPS
        res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
        next(); // Continue com a próxima rota
    }
  });
}

app.use('/admin', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  app.set('views', app.get('adminViews'));
  next();
});

app.use('/admin', adminViewsRouters);

app.use((req, res, next) => {
  app.set('views', path.join(__dirname, 'views'));
  next();
});

app.use('/', viewsRouters);
app.use('/api/v1', apiV1Routers);

if (config.certRequest.enabled) {
  app.use(config.certRequest.requestRoute, (req, res) => {
    res.status(200).send(config.certRequest.challenge);
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
