import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
     try {
          const cidades = await Knex<ICidade>(ETableNames.cidade).select()
               .where('id', Number(id))
               .orWhere('nome', 'like', `%${filter}%`)
               .offset((page - 1) * limit)
               .limit(limit);

          if (id > 0 && cidades.every(item => item.id !== id)) {
               const resultById = await Knex(ETableNames.cidade).select().where('id', id).first();
               if (resultById) return [...cidades, resultById];
          }
          
          return cidades;
     } catch (error) {
          return new Error('Erro ao acessar todos os registros');
     }
};