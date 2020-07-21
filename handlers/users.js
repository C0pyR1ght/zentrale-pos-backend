'use strict';

module.exports = function (req, res) {
    connection.query(
        'SELECT * FROM `pos_accounts` ORDER BY `name`',
        function (err, results) {
            results.map((row) => {
                row.profile_picture === '' ? row.profile_picture = process.env.AVATAR_DEFAULT : null;
                row.profile_picture = process.env.AVATAR_BASEURI + row.profile_picture;
            });
            res.json(results);
        }
    );
};
