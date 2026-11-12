const Empleado = require('../models/empleado.model');
const Activo = require('../models/activo.model');
const mongoose = require("mongoose");


const crearEmpleado = async (data) => {
    const { nombre, apellido, email, sector } = data;
    if (!data.nombre || !data.apellido || !data.email) {
        throw new Error("Datos incompletos o inválidos");
    }
    const empleado = new Empleado({nombre, apellido, email, sector});
    return await empleado.save();
};

const obtenerEmpleados = async (filtros) => {
    try {
        let empleados;
        if (filtros && Object.keys(filtros).length > 0) {
            let query = {};
            if (filtros.nombre) {
                query.nombre = { $regex: filtros.nombre, $options: "i" };
            }
            if (filtros.apellido) {
                query.apellido = { $regex: filtros.apellido, $options: "i" };
            }
            if (filtros.email) {
                query.email = { $regex: filtros.email, $options: "i" };
            }
            if (filtros.sector) {
                query.sector = mongoose.Types.ObjectId(filtros.sector);
            }
            empleados = await Empleado.find(query);
        } else {
            empleados = await Empleado.find();
        }
        return empleados;
    } catch (error) {
        throw new Error("Error al obtener empleados: " + error.message);
    }
};

const obtenerEmpleadoPorId = async (id, session = null) => {
    try {
        return await Empleado.findById(id);
    } catch (error) {
        throw new Error("Error al obtener el empleado: " + error.message);
    }
};

const actualizarEmpleado = async (id, data) => {
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, data, { new: true });
        if (!empleadoActualizado) {
            throw new Error("Empleado no encontrado");
        }
        return empleadoActualizado;
    } catch (error) {
        throw new Error("Error al actualizar el empleado: " + error.message);
    }
};



const obtenerActivosAsignados = async (empleadoId) => {
    try {
        if (!empleadoId) {
            throw new Error("El ID del empleado no puede estar vacío");
        }

        if (!mongoose.isValidObjectId(empleadoId)) {
            throw new Error("El ID del empleado no es válido");
        }

        const empleado = await Empleado.findById(empleadoId);

        if (!empleado) {
            throw new Error("No existe el empleado indicado");
        }

        const activos = await Activo.find({
            usuarioAsignado: empleado._id
        });

        return activos;
    } catch (error) {
        throw new Error("Error al obtener los activos asignados: " + error.message);
    }
};

module.exports = {
    crearEmpleado,
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    actualizarEmpleado,
    obtenerActivosAsignados
}