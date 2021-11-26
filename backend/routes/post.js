const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');
const commentController = require('../controllers/comment');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes pour les posts
router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.modifyPost);
router.delete('/:id', auth, postController.deletePost);
router.delete('/admin/:id', auth, postController.deletePostByAdmin);

// Routes pour les commentaires
router.post('/:postId/comments', auth, commentController.createComment);
router.get('/:postId/comments', auth, commentController.getAllComments);
router.get('/:postId/comments/:id', auth, commentController.getOneComment);
router.put('/:postId/comments/:id', auth, commentController.modifyComment);
router.delete('/:postId/comments/:id', auth, commentController.deleteComment);
router.delete('/admin/:postId/comments/:id', auth, commentController.deleteCommentByAdmin);

module.exports = router;