import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto  ${PORT}`);
});
