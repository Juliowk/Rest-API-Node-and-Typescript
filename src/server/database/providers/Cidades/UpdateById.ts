import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const updateById = async (id: number, nome: string): Promise<undefined | Error> => {
     try {
          const cidade = await Knex<ICidade>(ETableNames.cidade).where('id', id).update({ nome: nome }).returning('id');
          if (cidade.length <= 0) {
               throw new Error("Não foi possível encontrar a cidade com o ID especificado");
          }
     } catch (error) {
          return new Error("Não foi possível atualizar o campo");
     }
};
