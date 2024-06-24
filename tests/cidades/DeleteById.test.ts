import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - DeleteById', () => {
     
     it('Deletar registro', (async () => {
          const res = await testServer.post('/cidades').send({ nome: "Recife" });
          expect(res.statusCode).toEqual(StatusCodes.CREATED);

          const resDelete = await testServer.delete(`/cidades/${res.body}`).send();
          expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
     }));

     it('Tentar apagar um registro que não existe', (async () => {
          const res = await testServer.delete('/cidades/9999').send();

          expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
          expect(res.body).toHaveProperty('errors.default');
     }));

});