const mariadb = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// db 연결 정보
const pool = mariadb.createPool({
  host: 'localhost',
  user: root,
  password : GHKDwjddn,
  database: 'Travel',
  dateStrings : true
});

module.exports = pool;