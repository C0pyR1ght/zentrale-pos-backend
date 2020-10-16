'use strict';
const simple = require('./handlers/simple');
const products = require('./handlers/products');
const users = require('./handlers/users');
const orders = require('./handlers/orders');
const createorder = require('./handlers/createOrder');
const endAccountingPeriod = require('./handlers/endAccountingPeriod');
const admin = require('./handlers/admin');
const createInvoices = require('./handlers/createInvoices');
const deleteOrder = require('./handlers/deleteOrder');
const invoices = require('./handlers/invoices');
const invoiceStatus = require('./handlers/invoiceStatus');
const stats = require('./handlers/stats');

module.exports = function (app, opts) {
  app.get('/', simple);
  app.get('/admin', admin);
  app.get('/api/users', users);
  app.get('/api/stats', stats);
  //app.get('/api/user/:id', user);
  app.get('/api/products', products);
  app.get('/api/order/all', orders);
  app.post('/api/order/delete/:id', deleteOrder);
  app.post('/api/order/create', createorder);
  app.get('/api/invoice/all', invoices);
  app.post('/api/invoice/:id/status', invoiceStatus);
  app.post('/api/accountingperiod/endcurrentperiod', endAccountingPeriod);
  app.post('/api/accountingperiod/createinvoicesforlatestendedperiod', createInvoices);
};
