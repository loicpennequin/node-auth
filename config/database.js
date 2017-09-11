'use strict'

/*  =============================================================================
    Database config
    ============================================================================= */
let database = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

/*  =============================================================================
    Database connection
    ============================================================================= */
database.connect((error)=>{
    if (error){
      throw error
    }
    console.log('Connection to MySQL successful...')
})
