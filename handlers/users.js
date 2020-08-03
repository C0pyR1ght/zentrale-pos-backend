'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT * FROM `pos_accounts` ORDER BY `name`',
        function (err, results) {
          if (err) {
            console.error(err);
            return req.status(500).end();
          }
            results.map((row) => {
                row.profile_picture === '' ? row.profile_picture = process.env.AVATAR_DEFAULT : null;
                row.profile_picture = process.env.AVATAR_BASEURI + row.profile_picture;
            });
            res.json(results);
        }
    );
};
