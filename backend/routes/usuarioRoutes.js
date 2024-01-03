import express from "express";
const router = express.Router();
import {registrar} from "../controllers/usuarioController.js";

// Autenticacion, registros y confirmacion de usuarios
router.post("/", registrar); // crea un nuevo usuario

export default router;
