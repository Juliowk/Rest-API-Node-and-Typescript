import { Router } from 'express';
import { CidadesController, PessoasController } from '../controllers';

const router = Router();

router.get("/", (req, res) => {
     return res.send("Hello Word!");
});

router.post("/cidades", CidadesController.createValidation, CidadesController.create);
router.get("/cidades", CidadesController.getAllValidation, CidadesController.getAll);
router.get("/cidades/:id", CidadesController.getByIdValidation, CidadesController.getById);
router.put("/cidades/:id", CidadesController.updateValidation, CidadesController.updateById);
router.delete("/cidades/:id", CidadesController.deleteValidation, CidadesController.deleteById);

// router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
// router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
// router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
// router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
// router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);

export { router }