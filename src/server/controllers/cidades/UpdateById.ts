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
     if (!req.params.id) {
          return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'O parâmetro "id" precisa ser informado' } });
     }

     const cidade = await CidadesProvider.updateById(req.params.id, req.body);

     if (cidade instanceof Error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: cidade.message } });
     }

     return res.status(StatusCodes.NO_CONTENT).json(cidade);
};