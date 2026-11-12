const express = require("express");
const router = express.Router();

const movimientoController = require('../controllers/movimiento.controller');

//Ruta para obtener listado de movimientos
router.get('/', movimientoController.obtenerMovimientos);

//Ruta para obtener un movimiento por id
router.get('/:id', movimientoController.obtenerMovimientoPorId);

//Ruta para obtener movimientos de un activo
router.get('/activo/:id', movimientoController.obtenerMovimientosPorActivo);

module.exports = router;