const empleadoService = require('../service/empleado.service');


const empleadoController = {};

empleadoController.getAllEmpleados = async (req, res) => {
    try {
        const empleados = await empleadoService.obtenerEmpleados(req.query);
        if (!empleados || empleados.length === 0) {
            return res.status(404).json({
                message: "No se encontraron empleados"
            });
        }
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

empleadoController.createEmpleado = async (req, res) => {
    try {
        const nuevoEmpleado = await empleadoService.crearEmpleado(req.body);
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

empleadoController.getEmpleadoById = async (req, res) => {
    try {
        const empleado = await empleadoService.obtenerEmpleadoPorId(req.params.id);
        if (!empleado) {
            return res.status(404).json({
                message: "Empleado no encontrado"
            });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

empleadoController.updateEmpleado = async (req, res) => {
    try {
        const empleadoActualizado = await empleadoService.actualizarEmpleado(req.params.id, req.body);
        if (!empleadoActualizado) {
            return res.status(404).json({
                message: "Empleado no encontrado"
            });
        }
        res.status(200).json(empleadoActualizado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

empleadoController.getActivosAsignados = async (req, res) => {  
    try {
        const activosAsignados = await empleadoService.obtenerActivosAsignados(req.params.id);
        res.status(200).json(activosAsignados);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = empleadoController;