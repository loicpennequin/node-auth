'use strict';

const db = require('../../../config/database.js');
const passport = require('passport')

module.exports.add = function(req, res, next){
  if (!req.isAuthenticated())
    res.sendStatus(401);
  else{
    req.body.created_at = new Date();
    req.body.body = encodeURI(req.body.body);
    let sql = `INSERT INTO comments SET ?`,
        post = req.body;
        let query = db.query(sql, post, (err, result)=>{
          if (err) throw err;
          let sql = `
          SELECT
            s.id, s.body, s.created_at,
            GROUP_CONCAT( '{"id" : "', c.id, '", "author" : "', uc.username, '", "body" : "',  c.body, '", "created_at" : "', c.created_at, '"}' SEPARATOR ','
            ) AS comments,
            u.username
          FROM status as s
            LEFT JOIN users AS u
              ON s.user_id = u.id
            LEFT JOIN comments AS c
              ON c.status_id = s.id
            LEFT JOIN users AS uc
              ON c.user_id = uc.id
          WHERE s.id=${req.body.status_id}
          GROUP BY s.id
          `
          let query = db.query(sql, (err, result)=>{
            if (err) throw err;
            res.json(result)
          });
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
      res.json({message: "comment deleted"})
    });
  }
}
