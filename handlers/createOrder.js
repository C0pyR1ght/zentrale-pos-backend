'use strict';

module.exports = function (req, res) {
  connection.query(
      'INSERT INTO `pos_orders` (`pos_account_id`, `pos_product_id`, `pos_order_datetime`)' +
      'VALUES (?, ?, CURRENT_TIMESTAMP())',
      [req.body.pos_account_id, req.body.pos_product_id],
      function(err, results) {
        if (err) {
          console.error(err);
          return req.status(500).end();
        }
        const order = {...req.body};
        order.pos_order_id = results.insertId;
        res.json(order);
      }
  );
};
