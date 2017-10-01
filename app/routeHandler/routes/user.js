'use strict';

const { body, check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const db = require('../../../config/database.js');
const passport = require('passport')


module.exports.update = function(req, res, next){
  let sql = `UPDATE users SET ? WHERE id=${req.params.id}`;
  let post = req.body;
  let query = db.query(sql, post, (err, result)=>{
    if (err) throw err;
    res.json(result)
  });
};
