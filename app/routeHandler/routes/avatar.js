'use strict';

const db = require('../../../config/database.js');
const passport = require('passport')

module.exports.getAll = function(req,res,next){
  let sql = `SELECT * from avatars`,
      query = db.query(sql, (err, result)=>{
        if (err) throw err;

        res.json(result)
      })
}
