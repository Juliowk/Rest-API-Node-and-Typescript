import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get("/", (req, res) => {
     return res.send("Get");
});

router.post("/post", (req, res) => {
     return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
});

export { router }