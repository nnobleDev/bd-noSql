const express = require('express');
const router = express.Router();

const sectorController = require("../controllers/sector.controller")

//Ruta para obtener listado de sectores
router.get('/', sectorController.obtenerSectores);

//Ruta para obtener un sector por id
router.get('/:id', sectorController.obtenerSectorPorId);

//Ruta para crear un nuevo sector
router.post('/', sectorController.crearSector);

//Ruta para actualizar un sector
router.put('/:id', sectorController.actualizarSector);

//Ruta para obtener sectores de una sede
router.get('/sede/:sedeId', sectorController.obtenerSectoresPorSede);

module.exports = router;