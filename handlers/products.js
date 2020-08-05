'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT * FROM `pos_products`',
        function (err, results) {
            if (err) {
              console.log(err);
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
