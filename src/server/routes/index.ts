import { Router } from 'express';
import { CidadesController } from '../controllers';

const router = Router();

router.get("/", (req, res) => {
     return res.send("Hello Word!");
});

router.post("/cidades", CidadesController.createValidation, CidadesController.create);
router.get("/cidades", CidadesController.getAllValidation, CidadesController.getAll);
router.get("/cidades/:id", CidadesController.getByIdValidation, CidadesController.getById);
router.put("/cidades/:id", CidadesController.updateValidation, CidadesController.updateById);
router.delete("/cidades/:id", CidadesController.deleteValidation, CidadesController.deleteById);

export { router }