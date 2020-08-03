'use strict';

module.exports = function (req, res) {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    let query;
    if (limit && Number.isInteger(limit)) {
        query = "SELECT * FROM `pos_orders` ORDER BY `pos_order_id` DESC LIMIT " + limit;
    } else {
        query = "SELECT * FROM `pos_orders` ORDER BY `pos_order_id` DESC";
    }
    connection.query(
        query,
        function (err, results) {
          if (err) {
            console.error(err);
            return res.status(500).end();
          }
            results.map((row) => {
                row.imgsrc = process.env.PRODUCTIMG_BASEURI + row.imgsrc;
                row.price = row.price + ' €';
            });
            res.json(results);
        }
    );
};
