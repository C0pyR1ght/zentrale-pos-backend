'use strict'

module.exports = function (req, res) {
  res.json([
            {
                id: 0,
                name: "Lucas Böhm",
                imgsrc: "/img/avatars/avatar-lucas.png"
            },
            {
                id: 1,
                name: "Luca Feiser",
                imgsrc: "/img/avatars/avatar-luca.png"
            },
            {
                id: 2,
                name: "Gast",
                imgsrc: "/img/avatars/avatar-standard.png"
            }
        ])
}
