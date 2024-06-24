import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {

     it('Atualizar Registro', async () => {
          const res = await testServer.post('/cidades').send({ nome: "Recife" });
          expect(res.statusCode).toEqual(StatusCodes.CREATED);

          const resUpdateById = await testServer.put(`/cidades/${res.body}`).send({ nome: 'Natal' });
          expect(resUpdateById.status).toEqual(StatusCodes.NO_CONTENT);
     });

     it('Tenta atualizar registro que não existe', async () => {
          const res = await testServer.put("/cidades/9999").send({ nome: "Natal" });
          expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
          expect(res.body).toHaveProperty('errors.default');
     });

});