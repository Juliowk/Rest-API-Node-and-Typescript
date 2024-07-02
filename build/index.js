"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("./server/database/knex");
const server_1 = require("./server/server");
const startServer = () => {
    server_1.server.listen(process.env.PORT || 3333, () => {
        console.log(`App rodando na porta ${process.env.PORT || 3333}`);
    });
};
if (process.env.IS_LOCALHOST !== 'true') {
    knex_1.Knex.migrate.latest()
        .then(() => {
        startServer();
    })
        .catch((error) => console.log(error));
}
else {
    startServer();
}
