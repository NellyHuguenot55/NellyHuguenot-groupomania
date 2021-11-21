// Import du package dans le middleware
const multer = require("multer"); // Gére les fichiers entrants dans les requêtes HTTP vers notre API

// Préparer le dictionnaire de type MIME
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
};

const storage = multer.diskStorage({
    // Indiquer à multer
    destination: (req, file, callback) => {
        // D'enregistrer les fichiers dans le dossier "images"
        callback(null, "images");
    },
    // Indiquer à multer
    filename: (req, file, callback) => {
        // D'utiliser le nom d'origine et de remplacer les " " par des "_"
        const ogName = file.originalname;
        const name = ogName.split(" ").join("_").slice(0, ogName.lastIndexOf("."));
        // D'utiliser "MIME_TYPES" pour résoudre l'extension de fichier appropriée (mimetype du fichier envoyé par le frontend)
        const extension = MIME_TYPES[file.mimetype];
        // D'ajouter aussi un timestamp "Date.now()" dans le nom de fichier
        callback(null, name + "_" + Date.now() + "." + extension);
    }
});

// Exporter l'élément multer entièrement configuré en lui passant "storage" et en lui indiquant qu'on gère uniquement les téléchargements de fichiers "image"
module.exports = multer({ storage: storage }).single("image");