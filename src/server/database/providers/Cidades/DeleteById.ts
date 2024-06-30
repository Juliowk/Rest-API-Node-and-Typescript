import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const deleteById = async (id: number): Promise<void | Error> => {
     try {
          const cidade = await Knex<ICidade>(ETableNames.cidade).where('id', id).del();
          if (cidade > 0) {
               return;
          }
          throw new Error("Campo não deletado")
     } catch (error) {
          return new Error("Não foi possível deletar o campo");
     }
};
