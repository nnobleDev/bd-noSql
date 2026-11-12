const express = require('express');
const router = express.Router();
const sedeController = require('../controllers/sede.controller');

//Ruta para listar todas las sedes
router.get('/', sedeController.getAllSedes);

 //Ruta para crear una nueva sede
router.post('/', sedeController.crearSede);

//Ruta para obtener una sede específica
router.get('/:id', sedeController.obtenerSedePorId);

//Ruta para actualizar una sede
router.put('/:id', sedeController.actualizarSede);


module.exports = router;