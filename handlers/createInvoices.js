'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT * FROM `pos_orders` ORDER BY `pos_order_id` DESC',
        function (err, results, fields) {
            if (err) req.status(500).end();
            results.map((row) => {
                row.imgsrc = process.env.PRODUCTIMG_BASEURI + row.imgsrc;
                row.price = row.price + ' €';
            });
            res.json(results);
        }
    );
};
