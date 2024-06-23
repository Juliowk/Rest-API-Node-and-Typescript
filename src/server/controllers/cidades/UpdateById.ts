import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";

interface IParamProps {
     id?: number;
}

interface IbodyProps {
     nome: string;
}

export const updateValidation = validation((getSchema) => ({
     params: getSchema<IParamProps>(yup.object().shape({
          id: yup.number().required().integer().moreThan(0),
     })),
     body: getSchema<IbodyProps>(yup.object().shape({
          nome: yup.string().required().min(3),
     })),
}));

export const updateById = async (req: Request<IParamProps>, res: Response) => {
     console.log(req.body);
     console.log(req.params);
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado (UpdateByID)");
};