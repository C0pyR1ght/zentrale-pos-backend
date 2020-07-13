'use strict'

module.exports = function (req, res) {
  res.json([
              {
                  orderid: 0,
                  userid: 0,
                  productid: 0
              },
              {
                  orderid: 1,
                  userid: 1,
                  productid: 0
              },
              {
                  orderid: 2,
                  userid: 1,
                  productid: 2
              },
              {
                  orderid: 3,
                  userid: 1,
                  productid: 3
              },
              {
                  orderid: 4,
                  userid: 0,
                  productid: 0
              },
              {
                  orderid: 5,
                  userid: 1,
                  productid: 0
              },
              {
                  orderid: 6,
                  userid: 1,
                  productid: 2
              },
              {
                  orderid: 7,
                  userid: 1,
                  productid: 3
              }
        ])
}
