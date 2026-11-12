const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reporte.controller');

// Endpoint para obtener el resumen de inventario por sede, incluyendo el total de activos y la cantidad de activos en cada estado (disponible, asignado, mantenimiento, baja)
router.get('/resumen-inventario', reportesController.obtenerResumenInventario);

// Endpoint para obtener el historial de movimientos de un activo, recibimos el id del activo como parametro de url
router.get('/historial-activo/:id', reportesController.obtenerHistorialActivo);

// Endpoint para obtener movimientos por tipo y periodo de fechas, recibimos las fechas y el reporte nos devuelve el agrupado por tipo en el rango de fechas dadas
router.get('/movimientos', reportesController.obtenerMovimientosPorTipoYFecha); 

module.exports = router;