const http = require("http");
const app = require("./app");

// Renvoyer un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Le port validé
const port = normalizePort(process.env.PORT || "3000");

// Assigner le port validé à l'appli
app.set("port", port);

// Rechercher et gérer les erreurs
const errorHandler = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Créer le serveur
const server = http.createServer(app);

// Écouter le serveur
server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

// Configurer le serveur pour qu'il écoute le port approprié