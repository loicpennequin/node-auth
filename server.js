/**********************************************************************
******************************Node Auth********************************
******************************Loïc Pennequin***************************/

'use strict';

/*  =============================================================================
    Dependencies
    ============================================================================= */
require('dotenv').config({
    path : 'config/.env'
});

const bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      path = require('path'),
      mysql = require('mysql'),
      db = require("./config/database.js"),
      flash = require('connect-flash'),
      bcrypt = require('bcrypt'),
      fs = require('fs');

/*  =============================================================================
    Express
    ============================================================================= */
const express = require('express'),
      app = express();

/*  =============================================================================
    Configure session
    ============================================================================= */
const session = require('express-session'),
      sessionParams = session({secret: "gzjsiogjeog", name: 'sessionId', resave : false, saveUninitialized : false}),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

/*  =============================================================================
    App config
    ============================================================================= */
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionParams);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('src'));
app.use(express.static('vendor'));

/*  =============================================================================
    Configure Routes
    ============================================================================= */
require(path.join(__dirname, '/app/routeHandler/router.js'))(app);


/*  =============================================================================
    Passport config
    ============================================================================= */
passport.use(new LocalStrategy(
  function(username, password, done) {
    let sql = `SELECT id, username, password FROM users WHERE username = '${username}'`;
    let query = db.query(sql, (err, result)=>{
      if (err) return done(err) ;
      let user = result[0];
      if (!user) return done(null, false, { message: 'Incorrect username.' }) ;

      bcrypt.compare(password, user.password, function(err, res) {
        if(res !== true) return done(null, false, { message: 'Incorrect password.' });
        else return done(null, user.id);
      });
    });
  }
));

/*  =============================================================================
    Server start
    ============================================================================= */
let port = process.env.PORT;

app.listen(port, ()=>{
  console.log('===============================')
  console.log('serveur lancé sur le port ' + port)
  console.log('===============================')
});
