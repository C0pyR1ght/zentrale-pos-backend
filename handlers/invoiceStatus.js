'use strict';

module.exports = function (req, res) {
    connection.query(
        "UPDATE pos_invoices SET status = '" +req.body.status+ "' WHERE pos_invoices_id = " + req.params.id,
        function (err, results) {
            if (err) {
              console.log(err);
              return res.status(500).end();
            }
            res.json({
                status: 200
            });
        }
    );
};
