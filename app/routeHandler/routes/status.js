'use strict';

const { body, check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const db = require('../../../config/database.js');
const passport = require('passport')

module.exports.isLoggedIn = function(req, res, next){
  if (!req.isAuthenticated())
    res.send({loggedIn : false})
  else{
    let sql = `SELECT id,username FROM users WHERE id="${req.session.passport.user}" `;
    let query = db.query(sql, (err, result)=>{
      if (err) throw err;
      res.json({loggedIn: true, data:result})
    });
  }
};

module.exports.getFeed = function(req, res, next){
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
  GROUP BY s.id
  ORDER BY s.created_at DESC
  LIMIT 10
  `;
  let query = db.query(sql, (err, result)=>{
    if (err) throw err;
    res.json(result)
  });
};

module.exports.add = function(req, res, next){
  if (!req.isAuthenticated())
    res.sendStatus(401);
  else{
    req.body.created_at = new Date();
    let sql = `INSERT INTO status SET ?`,
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
      WHERE s.id=${result.insertId}
      GROUP BY s.id
      `
      let query = db.query(sql, (err, result)=>{
        if (err) throw err;
        res.json(result)
      });
    });
  }
};
