/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
let dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'movie_reviews', //
	user: 'postgres',
	password: 'password'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



// API calls

// Homepate
app.get('/', (req, res) => {
  let currTime = new Date();
	res.render('pages/main',{ 
		my_title: 'Movies Search'
	});
});


// Submitting a new review
app.post('/', (req, res) => {

  // New time stamp
  let currTime = new Date();
  // Movie name and the review
  let name = req.body.movie;
  let review = req.body.review;
  let fixedName = name.replace(`'`, `''`);
  // Insert query
  let insertQuery = `INSERT INTO reviews (name, review, review_date)
                     VALUES ('${fixedName}', '${review}', '${currTime}');`;

  // Select query to retrieve the data from the table
  let selectQuery = `SELECT name, review, review_date FROM reviews;`;

  // Run the SQL queries and render the reviews page
  db.task('get-everything', task => {
    return task.batch([
      task.any(insertQuery),
      task.any(selectQuery)
      ]);
  })
  .then(info => {
    res.render('pages/reviews', {
      my_title: 'Movie Reviews',
      data: info[1]
    });
  })
  .catch(err => {
    console.log('error', err);
  })


})


// get reviews page without submitting the review
app.get('/reviews', (req, res) => {

  // select query to retrieve data from the reviews table and load the reviews page
  let selectQuery = `SELECT name, review, review_date FROM reviews;`;
  db.any(selectQuery)
    .then(rows => {
      res.render('pages/reviews', {
        my_title: 'Movie Reviews',
        data: rows
      });
    })
    .catch(err => {
      console.log(err);
      res.render('pages/reviews', {
        my_title: 'Movie Reviews',
        data: ''
      });
    })
});


// Creating the port
const PORT = process.env.PORT || 8080;

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
console.log('http://localhost:3000/');
