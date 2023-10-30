function requireAuthentication(req, res, next) {
    if (req.session.user_id) {
      next();
    } else {
      res.status(401).json({ error: "Acceso no autorizado. Debes iniciar sesión." });
    }
  }
  
  module.exports = requireAuthentication;