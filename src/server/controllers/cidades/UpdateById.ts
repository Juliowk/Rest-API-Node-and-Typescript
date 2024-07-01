import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { ICidade, IParam } from "../../database/models";
import { CidadesProvider } from "../../database/providers/Cidades";

interface IParamProps extends IParam { };
interface IBodyProps extends Omit<ICidade, 'id'> { };

export const updateValidation = validation((getSchema) => ({
     params: getSchema<IParamProps>(yup.object().shape({
          id: yup.number().required().integer().moreThan(0),
     })),
     body: getSchema<IBodyProps>(yup.object().shape({
          nome: yup.string().required().min(3),
     })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
     const cidade = await CidadesProvider.updateById(Number(req.params.id), req.body);
     if (cidade instanceof Error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erros: { default: cidade.message } });
     }

     res.status(StatusCodes.OK).json();
};