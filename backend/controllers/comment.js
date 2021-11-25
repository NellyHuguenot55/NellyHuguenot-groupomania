const Comment = require('../models').Comment;
const User = require('../models').User;

// Ajouter un nouveau commentaire
exports.createComment = (req, res) => {
    const comment = {
        content: req.body.content,
        postId: req.params.postId,
        userId: req.body.userId
    };

    Comment.create(comment)
        .then(() => res.status(201).json({ message: 'Commentaire créé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de créer ce commentaire', error }));
}

// Afficher tous les commentaires
exports.getAllComments = (req, res) => {
    const postId = req.params.postId;

    Comment.findAll({ order: [['createdAt', 'ASC']], where: { postId: postId }, include: { model: User } })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher tous les commentaires', error }));
}

// Afficher un commentaire
exports.getOneComment = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;

    Comment.findOne({ where: { id: id, postId: postId }, include: { model: User } })
        .then(comment => {
            if(comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ message: 'Commentaire non trouvé' })
            }
        })
        .catch(error => res.status(400).json({ message: 'Impossible d\'afficher ce commentaire', error }));
}

// Modifier un commentaire
exports.modifyComment = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;
    const userId = req.body.userId;

    const updatedComment = { 
        content: req.body.content,
    };

    Comment.update(updatedComment, { where: { id: id, postId: postId, userId: userId } })
        .then(() => res.status(200).json({ message: 'Commentaire modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier ce commentaire', error }));
}

// Supprimer un commentaire
exports.deleteComment = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;
    const userId = req.body.userId;

    Comment.destroy({ where: { id: id, postId: postId, userId: userId } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer ce commentaire', error }))
}

// Supprimer un commentaire par l'admin
exports.deleteCommentByAdmin = (req, res) => {
    const id = req.params.id;
    const postId = req.params.postId;

    Comment.destroy({ where: { id: id, postId: postId } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer ce commentaire', error }))
}