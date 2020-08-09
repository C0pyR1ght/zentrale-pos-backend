'use strict';

const InvoiceService = require("../lib/InvoiceService");

module.exports = function (req, res) {
    var invoice = {
        logo: "https://zentrale-online.org/pos-logo.png",
        from: "Luca Feiser\nSchafgasse 1 St\n63500 Seligenstadt",
        currency: "eur",
        number: "ZENTRALE-0001",
        due_date: "28.07.1999",
        notes: "Zahlung Bar oder per PayPal: paypal.me/zentralepos",
    };


    connection.query(
        'SELECT * FROM pos_accounts;',
        function (err, results, fields) {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }

            results.forEach(account =>  {

                invoice.to = account.name;

                connection.query(
                    'SELECT count(*) AS quantity, name, price as unit_cost FROM `zentrale-pos`.pos_orders\n' +
                    'LEFT JOIN pos_products ON pos_orders.pos_product_id = pos_products.pos_products_id\n' +
                    'WHERE pos_account_id = '+ account.pos_account_id + ' \n' +
                    'GROUP BY pos_product_id;',
                    function (err, results, fields) {
                        if (err) {
                            console.error(err);
                            return res.status(500).end();
                        }

                        invoice.items = JSON.parse(JSON.stringify(results));
                        console.log(invoice);

                        InvoiceService(invoice, 'invoice'+account.pos_account_id+'.pdf', function() {
                            console.log("Saved invoice to invoice.pdf");
                        }, function(error) {
                            console.error(error);
                        });

                    }
                );

            });

        }
    );
};
