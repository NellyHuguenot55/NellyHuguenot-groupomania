const express = require("express");
// Créer le routeur
const router = express.Router();

// Import du modèle dans le routeur
const userCtrl = require("../controllers/user");
// Import du middleware d'authentification dans le routeur
const auth = require("../middleware/auth");
// Import du middleware de validation du mot de passe dans le routeur
const passwordValidator = require("../middleware/password-validator");

// Import de nos contrôleurs
router.post("/signup",passwordValidator, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/users/:id", auth, userCtrl.getUserProfile);
router.delete("/users/:id", auth, userCtrl.deleteOneUser);

// Permettre l'export du routeur sur d'autres fichiers
module.exports = router;