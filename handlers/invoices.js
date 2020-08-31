'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT pos_invoices_id AS invoice_number, name AS recipient, amount, date, due_date, startdate AS period_start, enddate AS period_end, status FROM pos_invoices\n' +
        'LEFT JOIN pos_accounts ON pos_accounts.pos_account_id = pos_invoices.pos_receiving_account_id\n' +
        'LEFT JOIN pos_accounting_periods ON pos_accounting_periods.pos_accounting_period_id = pos_invoices.pos_accounting_period_id\n',
        function (err, results) {
            if (err) {
              console.log(err);
              return res.status(500).end();
            }
            res.json(results);
        }
    );
};
