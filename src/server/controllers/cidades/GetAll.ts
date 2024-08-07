import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { IQuery } from "../../database/models";
import { CidadesProvider } from "../../database/providers/Cidades";

interface IQueryProps extends IQuery { };


export const getAllValidation = validation((getSchema) => ({
     query: getSchema<IQueryProps>(yup.object().shape({
          id: yup.number().integer().optional().default(0),
          page: yup.number().optional().moreThan(0),
          limit: yup.number().optional().moreThan(0),
          filter: yup.string().optional()
     }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
     const cidades = await CidadesProvider.getAll(req.query.page || 1, 
          req.query.limit || 7, 
          req.query.filter || '', 
          Number(req.query.id));

     const count = await CidadesProvider.count(req.query.filter);

     if (cidades instanceof Error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               errors: {
                    default: cidades.message
               }
          });
     };

     if (count instanceof Error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
               errors: {
                    default: count.message
               }
          });
     };

     res.setHeader('access-control-expose-headers', 'x-total-count');
     res.setHeader('x-total-count', count);

     return res.status(StatusCodes.OK).json(cidades);

};