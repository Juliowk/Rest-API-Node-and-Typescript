import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface ICidade {
     nome: string;
     estado: string
}

// yup.ObjectSchema<ICidade> indica que o esquema deve corresponder à estrutura definida pela interface ICidade.
// .shape() Define a forma do objeto, especificando as validações para cada propriedade.
const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
     nome: yup.string().required().min(3),
     estado: yup.string().required().min(2)
});

export const createBodyValidation: RequestHandler = async (req, res, next) => {

     try {
          await bodyValidation.validate(req.body, { abortEarly: false });
          return next();
     } catch (err) {
          const yupError = err as yup.ValidationError;
          const errors: Record<string, string> = {};

          yupError.inner.forEach(error => {
               if (!error.path) return;
               errors[error.path] = error.message;
          });

          return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });
     }

}

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

     console.log(req.body);     
     res.status(StatusCodes.OK).send("Create");

};