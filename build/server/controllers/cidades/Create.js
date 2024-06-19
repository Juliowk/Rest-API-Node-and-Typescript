"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const create = (req, res) => {
    const data = req.body;
    console.log(data.nome);
    return res.send(`Json: ${req.body.nome}`);
};
exports.create = create;
