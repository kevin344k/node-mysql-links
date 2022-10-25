const mysql = require("mysql");
const { promisify } = require("util");

const { database } = require("./keys");
// const { connect } = require("./routes");

//crea hilos que hace una tarea a la vez
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    }
    if (err.code == "ER_CON_COUNT_ERROR") {
      console.error("DATBASE HAS TO MANY CONNECTIONS");
    }

    if (err.code == "ECONNREFUSED")
      console.error("DATABASE CONNECTION WAS REFUSED");
  }
  if (connection) connection.release();
  console.log("DB IS Connected");
  return;
});

//promisify Pool Querys, es decir, permite convertir en promesas lo que antes eera callbacks
pool.query = promisify(pool.query);

module.exports = pool;
