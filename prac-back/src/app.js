// app.js
const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");

// Configuración de express-session
app.use(session({
  secret: "miClaveSecreta", 
  resave: false, 
  saveUninitialized: false 
}));


const actorRoutes = require("./actorRoutes");
const loginRoutes = require("./loginRoutes");


app.use(bodyParser.json());


// Rutas de la categoría
app.use("/api", actorRoutes);
app.use("/", loginRoutes);

const puerto = 4000;

app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
