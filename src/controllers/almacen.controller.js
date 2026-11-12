const almacenService = require("../service/almacen.service");

const almacenController = {};

almacenController.getAllAlmacenes = async (req, res) => {
    try {
        // Llamar al servicio para obtener todos los almacenes, usamos req.query para pasar los parámetros de búsqueda como url query
        const almacenes = await almacenService.obtenerAlmacenes(req.query); 
    if (!almacenes || almacenes.length === 0) {
            return res.status(404).json({
                message: "No se encontraron almacenes"
            });
        }
        res.status(200).json(almacenes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

almacenController.crearAlmacen = async (req, res) => {
    try {
        const nuevoAlmacen = await almacenService.crearAlmacen(req.body);
        res.status(201).json(nuevoAlmacen);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

almacenController.obtenerAlmacenPorId = async (req, res) => {
    try {
        const almacen = await almacenService.obtenerAlmacenPorId(req.params.id);
        if (!almacen) {
            return res.status(404).json({
                message: "Almacén no encontrado"
            });
        }
        res.status(200).json(almacen);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

almacenController.actualizarAlmacen = async (req, res) => {
    try {
        const almacenActualizado = await almacenService.actualizarAlmacen(req.params.id, req.body); 
        if (!almacenActualizado) {
            return res.status(404).json({
                message: "Almacén no encontrado"
            });
        }
        res.status(200).json(almacenActualizado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

almacenController.obtenerActivosDeAlmacen = async (req, res) => {
    try {
        const almacenId = req.params.id;
        const activos = await almacenService.obtenerActivosDeAlmacen(almacenId);
        res.status(200).json(activos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }   
};

module.exports = almacenController;
