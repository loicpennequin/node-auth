'use strict';

const { body, check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const passport = require('passport');
const db = require('../../config/database')

/*  =============================================================================
    Route Paths
    ============================================================================= */
let auth = require('./routes/auth.js');

/*  =============================================================================
    Passport Serialization
    ============================================================================= */
passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  let sql = `SELECT * FROM users WHERE id=${id}`;
  let query = db.query(sql, (err, result)=>{
    let user = result[0];
    done(err, {id: user.id, username: user.username});
  });
});

module.exports = function(app){

/*  =============================================================================
    Authentication
    ============================================================================= */

  app.post('/auth/register', auth.registerCheck, auth.register)
  app.post('/auth/signin',passport.authenticate('local', {
    successRedirect:"/",
    successfailure:"/"
  }))
  app.get('/auth/loggedin', auth.isLoggedIn)
  app.get('/auth/logout', auth.logout)
};
