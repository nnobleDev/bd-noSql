const movimientoService = require('../service/movimiento.service');

const movimientoController = {};

//Controller para obtener listado de movimientos, podemos recibir un query param para filtrar la busqueda
movimientoController.obtenerMovimientos = async (req, res) =>{
    try{
        const movimientos = await movimientoService.obtenerMovimientos(req.query);
        if(!movimientos || movimientos.length === 0){
            return res.status(404).json({
                message: "No hay movimientos"
            })
        }
        res.status(200).json(movimientos);
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Controller para obtener un movimiento por Id, recibimos el id movimiento por parametro de url
movimientoController.obtenerMovimientoPorId = async (req, res) =>{
    try{
        const movimiento = await movimientoController.obtenerMovimientoPorId(req.params.id);
        if(!movimiento){
            return res.status(404).json({
                message: "No existe el movimiento"
            })
        }
        res.status(200).json(movimiento);
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Controller para obtener movimientos por idActivo, recibimos el idActivo por parametro de url
movimientoController.obtenerMovimientosPorActivo = async (req, res) =>{
    try{
        const movimiento = await movimientoController.obtenerMovimientoPorId(req.params.activoId);
        if(!movimiento){
            return res.status(404).json({
                message: "No existe el movimiento"
            })
        }
        res.status(200).json(movimiento);
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = movimientoController;