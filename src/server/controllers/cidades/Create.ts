import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/Cidades";
import * as yup from 'yup';

interface IBodyProps extends Omit<ICidade, 'id'> { };

export const createValidation = validation((getSchema) => ({
     body: getSchema<IBodyProps>(yup.object().shape({
          nome: yup.string().required().min(3).max(150),
     }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
     const result = await CidadesProvider.create(req.body);
     if (result instanceof Error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               errors: {
                    default: result.message
               }
          })
     }
     return res.status(StatusCodes.CREATED).json(result);
};