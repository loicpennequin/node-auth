'use strict';

const db = require('../../../config/database.js');
const passport = require('passport')

module.exports.add = function(req, res, next){
  if (!req.isAuthenticated())
    res.sendStatus(401);
  else{
    req.body.created_at = new Date();
    let sql = `INSERT INTO comments SET ?`,
        post = req.body;
    let query = db.query(sql, post, (err, result)=>{
      if (err) throw err;
      res.json({message: "post added"})
    });
  }
};

module.exports.delete = function(req, res, next){
  if (!req.isAuthenticated())
    res.sendStatus(401);
  else{
    let sql = `DELETE FROM comments WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
      if (err) throw err;
      res.json({message: "post deleted"})
    });
  }
}
