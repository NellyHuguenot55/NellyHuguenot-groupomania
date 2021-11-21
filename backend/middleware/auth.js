// Import du package dans le middleware
const jwt = require("jsonwebtoken"); // Vérifie les tokens

module.exports = (req, res, next) => {
    try {
        // Extraire le token du header Authorization de la requête entrante (qui est après Bearer espace)
        const token = req.headers.authorization.split(" ")[1];
        // Décoder notre token en le vérifiant
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        // Extraire l'ID utilisateur de notre token
        const userId = decodedToken.userId;
        // Si la requête contient un identifiant userID
        // Si après comparaison, il ne correspond pas à celui extrait du token
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valable !";
            // Si après comparaison, il  correspond à celui extrait du token
        } else {
            // L'utilisateur est authentifié (tout fonctionne)
            console.log("User ID valable !");
            next();
        }
    } catch {
        // Toutes les erreurs générées
        res.status(401).json({ error: new Error("Requête non authentifiée !") });
    }
};