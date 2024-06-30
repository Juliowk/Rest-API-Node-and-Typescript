import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getAll = async (): Promise<ICidade[] | Error> => {
     try {
          const cidades = await Knex<ICidade>(ETableNames.cidade).select();
          return cidades;
     } catch (error) {
          return new Error('Erro ao acessar todos os registros');
     }
};