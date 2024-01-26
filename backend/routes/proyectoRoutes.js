import express from "express";
import {
  obtenerProyectos,
  nuevoProyecto,
  obetenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
} from "../controllers/proyectoController.js";
import checkAuth from "../middleware/checkAuth.js";

// expres router
const router = express.Router();
router
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

router
  .route("/:id")
  .get(checkAuth, obetenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.get("/tareas/:id", checkAuth, obtenerTareas);
router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador);
// el router.delete() solo se usa para eliminar por ejemplo un proyecto entero, no una pequeña parte del mismo como este caso, elimina solo el colaborador del proyecto.
router.get("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);
export default router;
