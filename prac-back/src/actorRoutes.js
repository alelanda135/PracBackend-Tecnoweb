// actorRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../BDD/db");
const requireAuthentication = require("./auth");

router.use(requireAuthentication);


// Obtener todos los actores
router.get("/actors", (req, res) => {
  db.query("SELECT * FROM actor", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener los actores." });
      return;
    }
    res.json(results);
  });
});

// Obtener un actor por ID
router.get("/actors/:id", (req, res) => {
  const actorId = req.params.id;
  db.query(
    "SELECT * FROM actor WHERE actor_id = ?",
    [actorId],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al obtener el actor." });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Actor no encontrado." });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Crear un nuevo actor
router.post("/actors", (req, res) => {
  const { first_name, last_name, date_of_birth } = req.body; 
  db.query(
    "INSERT INTO actor (first_name, last_name, date_of_birth) VALUES (?, ?, ?)", 
    [first_name, last_name, date_of_birth], 
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al crear el actor." });
        return;
      }
      res.json({ message: "Actor creado con éxito." });
    }
  );
});

// Actualizar un actor por ID
router.put("/actors/:id", (req, res) => {
  const actorId = req.params.id;
  const { first_name, last_name, date_of_birth } = req.body; 
  db.query(
    "UPDATE actor SET first_name = ?, last_name = ?, date_of_birth = ? WHERE actor_id = ?", 
    [first_name, last_name, date_of_birth, actorId], 
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al actualizar el actor." });
        return;
      }
      res.json({ message: "Actor actualizado con éxito." });
    }
  );
});

// Eliminar un actor por ID
router.delete("/actors/:id", (req, res) => {
  const actorId = req.params.id;
  db.query(
    "DELETE FROM actor WHERE actor_id = ?",
    [actorId],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al eliminar el actor." });
        return;
      }
      res.json({ message: "Actor eliminado con éxito." });
    }
  );
});

module.exports = router;
