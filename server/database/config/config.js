require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    use_env_variable:
      "mysql -hcontainers-us-west-173.railway.app -uroot -p0qFoixGijDuAaXELSxh7 --port 5883 --protocol=TCP railway",
  },
};
