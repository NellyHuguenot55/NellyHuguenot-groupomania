// Import du packages dans l'appli
const passwordValidator = require("password-validator");

// Créer un schéma
const passwordSchema = new passwordValidator();

// Lui ajouter les propriétés suivantes
passwordSchema
    .is().min(12)                                    // Minimum length 12
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .has().symbols()      // Must have at least 1 symbol

// Permettre l'export du schéma dans d'autres fichiers
module.exports = passwordSchema;