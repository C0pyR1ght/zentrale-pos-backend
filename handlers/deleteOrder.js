'use strict';

module.exports = function (req, res) {
  connection.query(
      'DELETE FROM `pos_orders` where pos_order_id = ?',
      req.params.id,
      function(err, results) {
        if (err) {
          console.error(err);
          return res.status(500).end();
        }
        res.json({
          status:200
        });
      }
  );
};
