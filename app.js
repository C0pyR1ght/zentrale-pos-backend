#! /usr/bin/env node
'use strict'

// Pass configuration to application
require('./index')({
  port: 8000,
  host: 'localhost'
});
