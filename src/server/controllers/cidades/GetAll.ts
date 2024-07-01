import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { IQuery } from "../../database/models";
import { CidadesProvider } from "../../database/providers/Cidades";

interface IQueryProps extends IQuery { };


export const getAllValidation = validation((getSchema) => ({
     query: getSchema<IQueryProps>(yup.object().shape({
          page: yup.number().optional().moreThan(0),
          limit: yup.number().optional().moreThan(0),
          filter: yup.string().optional()
     }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
     res.setHeader('access-control-expose-headers', 'x-total-count');

     const cidades = await CidadesProvider.getAll(<number>req.query.page, <number>req.query.limit, <string>req.query.filter);

     if (cidades instanceof Error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               errors: {
                    default: cidades.message
               }
          })
     }

     res.setHeader('x-total-count', cidades.length.toString());
     return res.status(StatusCodes.OK).json(cidades);

};