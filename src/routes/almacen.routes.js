const express = require("express");
const router = express.Router()
const almacenController = require("../controllers/almacen.controller");

// Ruta para obtener todos los almacenes
router.get("/", almacenController.getAllAlmacenes);

// Ruta para crear un nuevo almacén
router.post("/", almacenController.crearAlmacen);

// Ruta para obtener un almacén por ID
router.get("/:id", almacenController.obtenerAlmacenPorId);

// Ruta para actualizar un almacén por ID
router.put("/:id", almacenController.actualizarAlmacen);

// Ruta para obtener los activos de un almacén por ID
router.get("/:id/activos", almacenController.obtenerActivosDeAlmacen);  

module.exports = router;