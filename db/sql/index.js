const mysql = require('mysql');

const connection = mysql.createConnection({
    user: 'root',
    password: 'student',
    database: 'badmovies',
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });