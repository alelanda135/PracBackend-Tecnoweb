const express = require("express");
const router = express.Router();
const db = require("../BDD/db");


router.use(express.json());

// Ruta de inicio de sesión
router.post("/login", (req, res) => {
  const { username, password } = req.body;


  const query = "SELECT * FROM user WHERE username = ? AND password = ?";
  db.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error en la base de datos." });
    } else if (results.length === 0) {
      res.status(401).json({ error: "Credenciales incorrectas." });
    } else {
      const user_id = results[0].user_id;

      // Guarda el user_id en la sesión
      req.session.user_id = user_id;

      res.json({ message: 'Inicio de sesión exitoso', user_id });
    }
  });
});

module.exports = router;
