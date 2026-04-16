require('dotenv').config();

module.exports = {
  "development": {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "./src/database/database_test.sqlite"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "sqlite",
    "storage": "./src/database/database_production.sqlite"
  }
}
