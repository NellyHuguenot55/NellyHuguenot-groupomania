// Import du modèle dans l'appli
const passwordSchema = require("../models/Password");

// Valider le mot de passe en le comparant à passwordSchema
module.exports = (req, res, next) => {
    // Si le mdp saisi ne correspond pas au passwordSchema
    if (!passwordSchema.validate(req.body.password)){
        res
        // Dans Headers de la requête
        .writeHead(
            400,
            // Message de statut
            "=> Mot de passe insuffisant ! Les consignes n'ont pas été respectées",
            {"Content-Type": "application/json"})
            // Message de réponse
        .end("Mot de passe incorrect => les consignes n'ont pas été respectées !")
    } else {
        next();
    }
}