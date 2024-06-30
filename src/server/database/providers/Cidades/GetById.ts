import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getById = async (id: number): Promise<ICidade | Error> => {
     try {
          const cidade = await Knex<ICidade>(ETableNames.cidade).select().where('id', id).first();
          if (cidade) {
               return cidade;
          }
          throw new Error("Cidade não encontrada");          
     } catch (error) {
          return new Error("Não foi possível encontrar o elemento através do id informado");
     }
};