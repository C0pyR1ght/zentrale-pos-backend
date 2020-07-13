'use strict'
const simple = require('./handlers/simple')
const products = require('./handlers/products')
const users = require('./handlers/users')
const orders = require('./handlers/orders')
const createorder = require('./handlers/createOrder')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.get('/api/users', users)
  app.get('/api/products', products)
  app.get('/api/order/all', orders)
  app.post('/api/order/create', createorder)

}
