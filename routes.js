'use strict'
const simple = require('./handlers/simple')
const products = require('./handlers/products')
const users = require('./handlers/users')
const orders = require('./handlers/orders')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.get('/api/users', users)
  app.get('/api/products', products)
  app.get('/api/orders', orders)

}
