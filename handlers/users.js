'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT pos_accounts.*, saldi.saldo, sum(pos_products.price) as umsatz FROM `pos_accounts`\n' +
        'LEFT JOIN pos_orders ON pos_orders.pos_account_id = pos_accounts.pos_account_id\n' +
        'LEFT JOIN pos_products ON pos_orders.pos_product_id = pos_products.pos_products_id\n' +
        'LEFT JOIN (SELECT pos_account_id, sum(amount) as saldo FROM (\n' +
        'SELECT pos_account_id, sum(price) AS amount from pos_orders\n' +
        'LEFT JOIN pos_products ON pos_products.pos_products_id = pos_orders.pos_product_id\n' +
        'WHERE pos_order_datetime > (SELECT startdate FROM pos_accounting_periods ORDER BY pos_accounting_period_id DESC LIMIT 1)\n' +
        'GROUP BY pos_account_id\n' +
        'UNION ALL\n' +
        'SELECT pos_receiving_account_id AS pos_account_id, sum(amount) as amount from pos_invoices\n' +
        'WHERE status = \'offen\'\n' +
        'GROUP BY pos_account_id\n' +
        ') saldi GROUP BY pos_account_id) saldi ON pos_accounts.pos_account_id = saldi.pos_account_id\n' +
        'GROUP BY name\n' +
        'ORDER BY count(pos_order_id) DESC, name ASC',
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            let promisearray = [];
            results.map(async (row) => {
                promisearray.push(new Promise((resolve, reject) => {
                    connection.promise().query('SELECT pos_invoices_id AS invoice_number, name AS recipient, amount, date, due_date, startdate AS period_start, enddate AS period_end, status FROM pos_invoices\n' +
                        'LEFT JOIN pos_accounts ON pos_accounts.pos_account_id = pos_invoices.pos_receiving_account_id\n' +
                        'LEFT JOIN pos_accounting_periods ON pos_accounting_periods.pos_accounting_period_id = pos_invoices.pos_accounting_period_id\n' +
                        'WHERE pos_receiving_account_id = ' + row.pos_account_id + ' '+
                        'ORDER BY pos_invoices_id DESC')
                        .then(([rows, fields]) => {
                            row.invoices = rows;
                            console.log(rows);
                            resolve();
                        }).catch((e) => {
                            reject(e);
                        });
                }));
                console.log(row.invoices);
                row.profile_picture === '' ? row.profile_picture = process.env.AVATAR_DEFAULT : null;
                row.profile_picture = process.env.AVATAR_BASEURI + row.profile_picture;
                row.saldo === null ? row.saldo = 0 : null;
            });

            Promise.all(promisearray).then(() => {
                res.json(results);
            });
        });
};
