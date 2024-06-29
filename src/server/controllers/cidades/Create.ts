import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";
import * as yup from 'yup';

interface IBodyProps extends Omit<ICidade, 'id'> { };

export const createValidation = validation((getSchema) => ({
     body: getSchema<IBodyProps>(yup.object().shape({
          nome: yup.string().required().min(3),
     }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
     res.status(StatusCodes.CREATED).json(1);
};