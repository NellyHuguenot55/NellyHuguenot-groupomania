const express = require("express");
// Créer le routeur
const router = express.Router();

// Import du middleware d'authentification dans le routeur
const auth = require("../middleware/auth");
// Import du middleware multer dans le routeur
const multer = require("../middleware/multer-config");
// Import du modèle dans le routeur
const postCtrl = require("../controllers/post");

// Import des contrôleurs
                //POSTS
router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/user", auth, postCtrl.getOneUserPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
                // COMMENTAIRES
router.get("/:id/comments", auth, postCtrl.getOnePostComments);
router.post("/:id/comments", auth, postCtrl.createComment);
router.put("/comments/:id", auth, postCtrl.modifyComment);
router.delete("/comments/:id", auth, postCtrl.deleteComment);
                // LIKES/DISLIKES
router.post("/:id/opinion", auth, postCtrl.ratePost);

// Permettre l'export du routeur sur d'autres fichiers
module.exports = router;