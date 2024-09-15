require('dotenv').config()
const db_pass = process.env.DB_PASS;

module.exports ={
  
  "development": {
    "username": "root",
    "password": db_pass,
    "database": "007storedb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": db_pass,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": db_pass,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
