import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import yup from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query'
type TALLSchemas = Record<TProperty, yup.ObjectSchema<any>>

type TGetSchema = <T extends object>(schema: yup.ObjectSchema<T>) => yup.ObjectSchema<any>
type TGetAllSchema = (getSchema: TGetSchema) => Partial<TALLSchemas>;

// Tvalidation define como a fução dever ser (quais parametros e qual o tipo de retorno).
type Tvalidation = (getAllSchemas: TGetAllSchema) => RequestHandler;

export const validation: Tvalidation = (getAllSchemas) => async (req, res, next) => {

     const schemas = getAllSchemas((schema) => schema);

     const errorsResult: Record<string, Record<string, string>> = {};
     Object.entries(schemas).forEach(([key, schema]) => {

          try {
               schema.validateSync(req[key as TProperty], { abortEarly: false });
          } catch (err) {

               const yupError = err as yup.ValidationError;
               const errors: Record<string, string> = {};

               yupError.inner.forEach(error => {
                    if (!error.path) return;
                    errors[error.path] = error.message;
               });

               errorsResult[key] = errors;

          }

     });

     if (Object.entries(errorsResult).length === 0) {
          return next();
     } else {
          res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
     }

}