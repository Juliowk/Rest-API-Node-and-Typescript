import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {
     
     it('Criar registro', (async () => {
          const res = await testServer.post('/cidades').send({ nome: "Recife" });

          expect(res.statusCode).toEqual(StatusCodes.CREATED);
          expect(typeof res.body).toEqual('number');
     }));

     it('Tentar criar um registro com um nome muito curto', (async () => {
          const res = await testServer.post('/cidades').send({ nome: "Re" });

          expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
          expect(res.body).toHaveProperty('errors.body.nome');
     }));

});