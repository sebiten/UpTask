import express from "express";
const router = express.Router();
import {registrar, autenticar} from "../controllers/usuarioController.js";

// Autenticacion, registros y confirmacion de usuarios
router.post("/", registrar); // crea un nuevo usuario
router.post("/login", autenticar)

export default router;
