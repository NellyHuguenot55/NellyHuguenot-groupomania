// Import du package dans l'appli
const mysql = require('mysql');

console.log('................................................');
console.log('........Connexion à la base de données........');
console.log('................................................');

// Établissement de la connexion à MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

console.log('...En cours de connexion à la base de données...');
console.log('................................................');

// Connexion à la base de données Groupomania
db.connect(function(error) {
    if (error){
        console.log('................................................');
        console.log('..........Connexion à MySQL échouée..........');
        console.log('................................................');
        throw error;
    }
    console.log('................................................');
    console.log("......Connexion à MySQL réussie......");
    console.log('................................................');
});

module.exports = db;