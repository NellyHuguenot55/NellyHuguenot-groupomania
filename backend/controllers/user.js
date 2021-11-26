const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models').User;
const Op = require('sequelize').Op;

dotenv.config();

// S'inscrire
exports.signup = (req, res) => {
    // Valider le mot de passe
    var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (regex.test(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                };
                User.create(user)
                    .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !' }))
                    .catch(error => res.status(400).json({ message: 'Impossible de créer cet utilisateur', error }));
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        return res.status(401).json({ message: 'Le mot de passe doit avoir au moins 8 caractères, un nombre, une minuscule, et une majuscule' })
    }
};

// Se connecter
exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' })
            }
            // Bcrypt compare le mot de passe avec le hash enregistré
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: user.id,
                        // Génère un token
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Afficher un user
exports.getOneUser = (req, res) => {
    const userId = req.params.id;

    User.findByPk(userId)
        .then(user => {
            if (user) {
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                });
            } else {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
        })
        .catch(error => res.status(500).json({ message: 'Impossible de trouver cet utilisateur', error }));
}

// Modifier un user
exports.modifyUser = (req, res) => {
    const userId = req.params.id;

    const updatedUser = {
        name: req.body.name
    }

    User.update(updatedUser, { where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier cet utilisateur', error }));

}

// Supprimer un user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    User.destroy({ where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de supprimer cet utilisateur', error }));
}

// Afficher tous les utilisateurs sauf l'admin
exports.getAllUsersByAdmin = (req, res) => {
    const userId = req.params.id;
    
    User.findAll({
        where: {
            id: {
                [Op.not]: userId
            }
        }
    }).then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ message: 'Impossible d\'afficher les utilisateurs', error }));

}

// Modifier le rôle d'un utilisateur
exports.modifyUserRole = (req, res) => {
    const id = req.params.id;

    let updatedRole = {
        isAdmin: req.body.isAdmin
    }

    User.update(updatedRole, { where: { id: id }})
        .then(() => res.status(200).json({ message: 'Rôle de l\'utilisateur modifié avec succès' }))
        .catch(error => res.status(400).json({ message: 'Impossible de modifier le rôle de cet utilisateur', error }));
}