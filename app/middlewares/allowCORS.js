'use strict';
/**
 * Define an allow Cross Origin Request middleware.
 * Mainly used in dev environment.
 *
 */

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
