const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "blogsite",
  password: "",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = con;
