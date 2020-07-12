'use strict'

module.exports = function (req, res) {
  res.json([
      {
        id: 0,
        name: "Fritz-Getränke",
        price: "1,50 €",
        imgsrc: "/img/products/fritz-getraenke.jpg"
      },
      {
        id: 1,
        name: "Trade-Islands Iced Tea",
        price: "2,00 €",
        imgsrc: "/img/products/trade-islands.jpg"
      },
      {
        id: 2,
        name: "Bier 0,33l",
        price: "1,00 €",
        imgsrc: "/img/products/bier-klein.jpg"
      },
      {
        id: 3,
        name: "Bier 0,5l",
        price: "2,00 €",
        imgsrc: "/img/products/bier-gross.jpg"
      }
    ])
}
