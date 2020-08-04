'use strict';

module.exports = function (req, res) {
  console.log("delete Order: " req.params.id);
    res.json({
      status:200
    });
};
