'use strict';

module.exports = function (req, res) {
  connection.query(
      'UPDATE `pos_accounting_periods` SET `enddate` = CURRENT_TIMESTAMP() ORDER BY `pos_accounting_period_id` DESC limit 1;' +
      'INSERT INTO `pos_accounting_periods` (`startdate`) VALUES (CURRENT_TIMESTAMP())',
      function(err, results) {
        if (err) {
          console.error(err);
          return res.status(500).end();
        }
        const order = {...req.body};
        order.pos_order_id = results.insertId;
        res.json({
          status: 'success'
        });
      }
  );
};
