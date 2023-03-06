const { host, user, password, database } = require("../config");
const mysql = require("mysql");
const dotenv = require("dotenv").config();
const con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

/* con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
}); */
module.exports = con;
