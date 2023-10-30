// db.js
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "sakila", 
  port: 3307,
});

connection.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos: " + error.stack);
    return;
  }
  console.log(
    "Conexión a la base de datos establecida como el ID " + connection.threadId
  );
});

module.exports = connection;
