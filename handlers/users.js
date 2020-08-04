'use strict';

module.exports = function (req, res) {
    connection.query(
      'SELECT pos_accounts.* FROM `pos_accounts`'+
      'LEFT JOIN pos_orders ON pos_orders.pos_account_id = pos_accounts.pos_account_id'+
      'GROUP BY name'+
      'ORDER BY count(pos_order_id) DESC, name ASC'+
      'SELECT * FROM `pos_accounts` ORDER BY `name`',
        function (err, results) {
          if (err) {
            console.error(err);
            return res.status(500).end();
          }
          results.map((row) => {
              row.profile_picture === '' ? row.profile_picture = process.env.AVATAR_DEFAULT : null;
              row.profile_picture = process.env.AVATAR_BASEURI + row.profile_picture;
          });
          res.json(results);
        }
    );
};
