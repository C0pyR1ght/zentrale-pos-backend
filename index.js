'use strict';
const express = require('express');
const httpErrors = require('http-errors');
const pino = require('pino');
const pinoHttp = require('pino-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

module.exports = function main (options, cb) {
  // Set default options
  const ready = cb || function () {};
  const opts = Object.assign({
    // Default options
  }, options);

  const logger = pino(pino.destination('./pos-backend.log'));

  // Server state
  let server;
  let serverStarted = false;
  let serverClosing = false;

  // Setup error handling
  function unhandledError (err) {
    // Log the errors
    logger.error(err);

    // Only clean up once
    if (serverClosing) {
      return
    }
    serverClosing = true;

    // If server has started, close it down
    if (serverStarted) {
      server.close(function () {
        process.exit(1)
      })
    }
  }
  process.on('uncaughtException', unhandledError);
  process.on('unhandledRejection', unhandledError);

  global.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true
  });

  // Create the express app
  const app = express();


  // Common middleware
  // app.use(/* ... */)
  app.use(pinoHttp({ logger }));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');

  // Set up a whitelist and check against it:
  var corsOptions = {
    origin: 'https://zentrale-online.org',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  // Then pass them to cors:
  app.use(cors(corsOptions));

  // Register routes
  // @NOTE: require here because this ensures that even syntax errors
  // or other startup related errors are caught logged and debuggable.
  // Alternativly, you could setup external log handling for startup
  // errors and handle them outside the node process.  I find this is
  // better because it works out of the box even in local development.
  require('./routes')(app, opts);

  // Common error handlers
  app.use(function fourOhFourHandler (req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`))
  });

  app.use(function fiveHundredHandler (err, req, res, next) {
    if (err.status >= 500) {
      logger.error(err);
    }
    res.status(err.status || 500).json({
      messages: [{
        code: err.code || 'InternalServerError',
        message: err.message
      }]
    })
  });

  // Start server
  server = app.listen(opts.port, opts.host, function (err) {
    if (err) {
      return ready(err, app, server);
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error('Server was closed before it could start'));
    }

    serverStarted = true;
    const addr = server.address();
    logger.info(`Started at ${opts.host || addr.host || 'localhost'}:${addr.port}`);
    ready(err, app, server)
  });
};
