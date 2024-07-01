import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
     try {
          const cidade = await Knex(ETableNames.cidade).where('id', id).del();
          if (cidade > 0) {
               return;
          }
          return new Error("Não foi possível deletar o campo");
     } catch (error) {
          return new Error("Não foi possível deletar o campo");
     }
};
