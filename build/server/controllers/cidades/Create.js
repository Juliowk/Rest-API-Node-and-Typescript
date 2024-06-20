"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.createBodyValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
// yup.ObjectSchema<ICidade> indica que o esquema deve corresponder à estrutura definida pela interface ICidade.
// .shape() Define a forma do objeto, especificando as validações para cada propriedade.
const bodyValidation = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2)
});
const createBodyValidation = async (req, res, next) => {
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
        return next();
    }
    catch (err) {
        const yupError = err;
        const errors = {};
        yupError.inner.forEach(error => {
            if (!error.path)
                return;
            errors[error.path] = error.message;
        });
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors });
    }
};
exports.createBodyValidation = createBodyValidation;
const create = async (req, res) => {
    console.log(req.body);
    res.status(http_status_codes_1.StatusCodes.OK).send("Create");
};
exports.create = create;