'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT * FROM `pos_products`',
        function (err, results) {
          if (err) {
            console.error(err);
            return res.status(500).end();
          }
          console.log(err);
            results.map((row) => {
                row.imgsrc = process.env.PRODUCTIMG_BASEURI + row.imgsrc;
                row.price = row.price + ' €';
            });
            res.json(results);
        }
    );
};
