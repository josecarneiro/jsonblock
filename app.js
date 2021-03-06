'use strict';

const path = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const serveFavicon = require('serve-favicon');
const baseRouter = require('./routes/base');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(compression());
app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.json());

app.use('/', baseRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
