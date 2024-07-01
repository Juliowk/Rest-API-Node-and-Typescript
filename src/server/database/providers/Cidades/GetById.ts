import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getById = async (id: number): Promise<ICidade | Error> => {
     try {
          const cidade = await Knex<ICidade>(ETableNames.cidade).select().where('id', id).first();
          if (cidade) return cidade;

          return new Error("Cidade não encontrada");
     } catch (error) {
          return new Error("Erro ao consultar cidade");
     }
};