'use strict';
const dateFormat = require('dateformat');
const InvoiceService = require("../lib/InvoiceService");

module.exports = function (req, res) {
    connection.query(
        'SELECT * FROM pos_accounting_periods '+
    'WHERE startdate IS NOT NULL AND enddate IS NOT NULL '+
    'ORDER BY pos_accounting_period_id desc '+
    'LIMIT 1',
        function (err, results, fields) {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            const result = JSON.parse(JSON.stringify(results[0]));
            console.log(result);
            generateInvoiceForPeriod(result)
        }
    );
};

function generateInvoiceForPeriod(period) {
  connection.query(
      'SELECT * FROM pos_accounts;',
      function (err, results, fields) {
          if (err) {
              console.error(err);
              return res.status(500).end();
          }
          results.forEach(account => generateInvoiceForAccount(account, period));
      }
  );
}

function generateInvoiceForAccount(account, period) {


  // calc due Date
  let dueInWeeks = 2;
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + dueInWeeks * 7);
  let dueDateString = dateFormat(dueDate, "dd.mm.yyyy");
  let currentDateString = dateFormat(new Date(), "dd.mm.yyyy");
  let periodStartString = dateFormat(period.startdate, 'dd.mm.yyyy HH:MM "Uhr"');
  let periodEndString = dateFormat(period.enddate, 'dd.mm.yyyy HH:MM "Uhr"');

  var invoice = {
      logo: "https://zentrale-online.org/pos-logo.png", // todo quality
      from: "Luca Feiser\nSchafgasse 1\n63500 Seligenstadt",
      currency: "eur",
      items: [],
      date: currentDateString,
      due_date: dueDateString,
      notes: "Abrechnungszeitraum: " +periodStartString+ " bis " +periodEndString+ ". \nZahlung Bar oder per PayPal: paypal.me/zentralepos",
  };
  invoice.to = account.name;

  connection.query(
      'SELECT count(*) AS quantity, name, price as unit_cost FROM pos_orders\n' +
      'LEFT JOIN pos_products ON pos_orders.pos_product_id = pos_products.pos_products_id\n' +
      'WHERE pos_account_id = '+ account.pos_account_id + ' AND pos_order_datetime BETWEEN \''+ period.startdate +'\' AND \''+ period.enddate +'\' \n' +
      'GROUP BY pos_product_id;',
      function (err, results, fields) {
          if (err) {
              console.error(err);
              return res.status(500).end();
          }
          console.log(results);

          invoice.items = JSON.parse(JSON.stringify(results));
          generateDBInvoice(invoice, account, period);
      }
  );
}

function generateDBInvoice(invoice, account, period) {

  const amount =  invoice.items.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.unit_cost;
  }, 0);

  connection.query(
      'INSERT INTO `pos_invoices`'+
      '(`pos_receiving_account_id`,'+
        '`pos_accounting_period_id`,'+
        '`amount`,'+
        '`status`)'+
        'VALUES ('+
        account.pos_account_id+','+
        period.pos_accounting_period_id+','+
        amount + ', \'offen\');',
      function (err, results, fields) {
          if (err) {
              console.error(err);
              return res.status(500).end();
          }

          invoice.number = "ZENTRALE-" + results.insertId;
          if (amount > 0) generateSingleInvoice(invoice, account);
      }
  );
}

function generateSingleInvoice(invoice, account) {
  InvoiceService(invoice, 'Rechnung-' + invoice.number + '.pdf', function() {
      console.log("Saved invoice to invoice.pdf");
      // -->
  }, function(error) {
      console.error(error);
  });
}
