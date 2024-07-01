import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
     try {
          const cidadeResult = await Knex(ETableNames.cidade).where('id', id).update(cidade);
          if (cidadeResult > 0) return;

          return new Error("Não foi possível atualizar o campo");
     } catch (error) {
          return new Error("Não foi possível atualizar o campo");
     }
};
