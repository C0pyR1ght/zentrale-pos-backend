'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT pos_products.name as title, count(*) as value FROM pos_orders \n' +
        'LEFT JOIN pos_products ON pos_products.pos_products_id = pos_orders.pos_product_id\n' +
        'group by pos_product_id;',
        function (err, results) {
            if (err) {
              console.log(err);
              return res.status(500).end();
            }
            const colors = [
                "#a2d2ff",
                "#cdb4db",
                "#ffafcc",
                "#bde0fe",
                "#ffc8dd"
            ];
            results.map((element, index) => {
                element.color = colors[index];
            });
            res.json(results);
        }
    );
};
