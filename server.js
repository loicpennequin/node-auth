/*********************************************************************
******************************project name****************************
******************************author*********************************/

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
      sessionParams = session({secret: "gzjsiogjeog", resave : false, saveUninitialized : true});

/*  =============================================================================
    App config
    ============================================================================= */
app.disable('x-powered-by');
app.use(express.static('src'));
app.use(express.static('vendor'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
if(process.env.NODE_ENV === 'development'){
    app.use(require(path.join(__dirname, '/app/middlewares/allowCORS.js')));
};

/*  =============================================================================
    Configure Routes
    ============================================================================= */
require(path.join(__dirname, '/app/routeHandler/router.js'))(app);

/*  =============================================================================
    Server start
    ============================================================================= */
let port = process.env.PORT;

app.listen(port, ()=>{
  console.log('===============================')
  console.log('serveur lancé sur le port ' + port)
  console.log('===============================')
});
