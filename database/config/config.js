const db_pass = process.env.DB_PASS;
module.exports ={
  "development": {
    "username": "avnadmin",
    "password": "",
    "database": "defaultdb",
    "host": "mysql-8f6419b-global007store.c.aivencloud.com",
    "port":"14974",
    "dialect": "mysql"
  },
  "test": {
   "username": "avnadmin",
    "password": "",
    "database": "defaultdb",
    "host": "mysql-8f6419b-global007store.c.aivencloud.com",
    "port":"14974",
    "dialect": "mysql"
  },
  "production": {
    "username": "avnadmin",
    "password": "",
    "database": "defaultdb",
    "host": "mysql-8f6419b-global007store.c.aivencloud.com",
    "port":"14974",
    "dialect": "mysql"
  }
}
