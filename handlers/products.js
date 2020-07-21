'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT * FROM `pos_products`',
        function (err, results) {
            results.map((row) => {
                row.imgsrc = process.env.PRODUCTIMG_BASEURI + row.imgsrc;
                row.price = row.price + ' €';
            });
            res.json(results);
        }
    );
};
