import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";

interface ICidade {
     nome: string;
     estado: string
}

interface Ifilter {
     filter?: string,
}

export const createValidation = validation((getSchema) => ({
     body: getSchema<ICidade>(yup.object().shape({
          nome: yup.string().required().min(3),
          estado: yup.string().required().min(2)
     })),
     query: getSchema<Ifilter>(yup.object().shape({
          filter: yup.string().required(),
     }))
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
     console.log(req.query);
     res.status(StatusCodes.OK).send("Create");
};