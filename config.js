const dotenv = require("dotenv");
dotenv.config();
const dbConfig = {
  host: "localhost",
  user: "meski",
  password: "meski",
  database: "meski_holding",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
module.exports = {
  port: process.env.PORT,
  dbConfig,
};
