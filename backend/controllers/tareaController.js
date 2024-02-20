import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);

  if (!existeProyecto) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json({ msg: error.message });
  }
  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes los permisos para añadir tareas");
    return res.status(403).json({ msg: error.message });
  }
  try {
    const tareaAlacenada = await Tarea.create(req.body);
    res.json(tareaAlacenada);
  } catch (error) {
    console.log(error);
  }
};
const obtenerTarea = async (req, res) => {
  const { id } = req.params;
  // hacemos dos consultas en una con el populate
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error });
  }
  // verifica si los usuarios tienen permisos
  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error });
  }
  res.json(tarea);
};
const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  // hacemos dos consultas en una con el populate
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error });
  }
  // verifica si los usuarios tienen permisos
  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ msg: error });
  }
  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
  try {
    const tareaAlacenada = await tarea.save();
    res.json(tareaAlacenada);
  } catch (error) {
    console.log(error);
  }
};
const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  console.log(tarea);

  if (!tarea) {
    const error = new Error("No encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // identificar que la persona que desea eliminar sea el que lo creo
  if (tarea.proyecto.creador.toString() === req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  try {
    await tarea.deleteOne();
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
  }
};
const cambiarEstado = async (req, res) => {};

export {
  agregarTarea,
  actualizarTarea,
  cambiarEstado,
  eliminarTarea,
  obtenerTarea,
};
