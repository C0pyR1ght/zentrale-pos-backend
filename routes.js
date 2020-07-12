'use strict'
const simple = require('./handlers/simple')
const products = require('./handlers/products')
const users = require('./handlers/users')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.get('/api/users', users)
  app.get('/api/products', products)
}
