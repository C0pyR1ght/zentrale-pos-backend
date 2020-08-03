'use strict';

module.exports = function (req, res) {
    res.json({
      balance: -57.3,
      invoices: [
        {
          name: "invoice 1",
          amount: 12.5,
          status: "bezahlt"
        },
        {
          name: "invoice 2",
          amount: 18.5,
          status: "bezahlt"
        }
      ]
    })
};
