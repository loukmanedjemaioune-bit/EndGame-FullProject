const sql = require("mssql");
/* const config = {
  HOST: "localhost",
  USER: "sa",
  PASSWORD: "NewStrongPassword123",
  DB: "EndGameDB",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}; */
const config = {
  user: "sa",
  password: "NewStrongPassword123",
  server: "localhost",
  database: "EndGameDB",
  options: {
    encrypt: false, // حسب إعدادات SQL Server
  },
  pool: {
    max: 5,
    min: 0,
    idleTimeoutMillis: 10000,
  },
};
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database connection failed:", err));

module.exports = poolPromise;
