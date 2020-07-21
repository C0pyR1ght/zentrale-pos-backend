#! /usr/bin/env node
'use strict'
require('dotenv').config();

// Pass configuration to application
require('./index')({
  port: 8000,
  host: 'localhost'
});
