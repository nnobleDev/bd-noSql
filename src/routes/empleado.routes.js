const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleado.controller');

// Ruta para obtener todos los empleados
router.get('/', empleadoController.getAllEmpleados);

// Ruta para crear un nuevo empleado
router.post('/', empleadoController.createEmpleado);

// Ruta para obtener un empleado por su ID
router.get('/:id', empleadoController.getEmpleadoById);

// Ruta para actualizar un empleado
router.put('/:id', empleadoController.updateEmpleado);

// Ruta para obtener los activos asignados a un empleado
router.get('/:id/activos', empleadoController.getActivosAsignados);

module.exports = router;