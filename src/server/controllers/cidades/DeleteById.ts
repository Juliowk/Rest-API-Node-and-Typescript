import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { IParam } from "../../database/models";
import { CidadesProvider } from "../../database/providers/Cidades";

interface IParamProps extends IParam { }

export const deleteValidation = validation((getSchema) => ({
     params: getSchema<IParamProps>(yup.object().shape({
          id: yup.number().required().integer().moreThan(0),
     })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
     if (!req.params.id) {
          return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'O parâmetro "id" precisa ser informado' } });
     }

     const cidade = await CidadesProvider.deleteById(<number>req.params.id);
     
     if (cidade instanceof Error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: cidade.message } });
     }
     return res.status(StatusCodes.NO_CONTENT).send();
};