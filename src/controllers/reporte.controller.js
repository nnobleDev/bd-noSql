const reporteService = require('../service/reporte.service');

const reporteController = {};

reporteController.obtenerResumenInventario = async (req, res) => {
    try {
        const resumen = await reporteService.obtenerResumenInventario();
        res.status(200).json(resumen);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

reporteController.obtenerHistorialActivo = async (req, res) => {
    try {
        const historial = await reporteService.obtenerHistorialActivo(req.params.id);
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

reporteController.obtenerMovimientosPorTipoYFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const movimientos = await reporteService.obtenerMovimientosPorTipoYFecha(fechaInicio, fechaFin);
        res.status(200).json(movimientos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = reporteController;