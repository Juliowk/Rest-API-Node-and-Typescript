import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup';

interface ICidade {
     nome: string;
};

export const createValidation = validation((getSchema) => ({
     body: getSchema<ICidade>(yup.object().shape({
          nome: yup.string().required().min(3)
     }))
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
     res.status(StatusCodes.CREATED).json(1);
};