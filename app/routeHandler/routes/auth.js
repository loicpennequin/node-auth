'use strict';

const { body, check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const db = require('../../../config/database.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport')

module.exports.registerCheck = [
 body('username', 'Username is required').exists(),
 body('username', 'Username must be between 4 and 20 characters long').isLength({ min: 4, max: 20 }),
 body('password', 'Password is required').exists(),
 body('password', 'Password must be between 4 and 20 characters long').isLength({ min: 6, max: 20 }),
 body('password').custom((value,{req}) => {
     if (value !== req.body.passwordMatch) {
         throw new Error("Your passwords don't match.");
     } else {
         return value;
     }
 })
];

module.exports.register = function(req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({ errors: errors.mapped() });
  }
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    let post = {
      username : req.body.username,
      password : hash
    };
    let sql = "INSERT INTO users SET ?",
        query = db.query(sql, post, (err, result)=>{
          if (err){
            throw err
          }
          res.send('registration successful')
      });
  });
};

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

module.exports.logout = function(req,res){
  req.logout();
  req.session.destroy();
  res.send("successfully logged out")
}
