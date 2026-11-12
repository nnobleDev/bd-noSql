const express = require('express');
const router = express.Router();
const activoController = require('../controllers/activo.controller');

//Ruta para listar todos los activos
router.get('/', activoController.getAllActivos);

//Ruta para obtener un activo por id
router.get('/:id', activoController.obtenerActivoPorId);

//Ruta para obtener un activo por nroInventario
router.get('/inventario/:nroInventario', activoController.obtenerActivoPorNroInventario);

//Ruta para crear un activo
router.post('/', activoController.crearActivo);

//Ruta para actualizar un activo
router.put('/:id', activoController.actualizarActivo);

//Ruta para asignar un activo a un empleado
router.post('/asignar', activoController.asignarActivo);

//Ruta para desasignar un activo
router.post('/desasignar/:id', activoController.desasignarActivo);

//Ruta para trasladar un activo
router.post('/trasladar/:id', activoController.trasladarActivo);

//Ruta para enviar un activo a mantenimiento
router.post('/mantenimiento/:id', activoController.enviarAMantenimiento);

//Ruta para dar de baja un activo
router.post('/baja/:id', activoController.darDeBajaActivo);

module.exports = router;