import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";

interface IParamProps {
     id?: number;
}

interface IBodyProps extends Omit<ICidade, 'id'> { };

export const updateValidation = validation((getSchema) => ({
     params: getSchema<IParamProps>(yup.object().shape({
          id: yup.number().required().integer().moreThan(0),
     })),
     body: getSchema<IBodyProps>(yup.object().shape({
          nome: yup.string().required().min(3),
     })),
}));

export const updateById = async (req: Request<IParamProps>, res: Response) => {
     if (Number(req.params.id) === 9999) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               errors: {
                    default: 'Registro não encontrado',
               },
          });
     }

     res.status(StatusCodes.NO_CONTENT).send();
};