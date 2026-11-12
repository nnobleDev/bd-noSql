const Almacen = require('../Models/almacen.model');


const mongoose = require("mongoose");

const crearAlmacen = async (data) => {
    const { nombre, sede, ubicacion, responsable, activo } = data;

    // Validamos que los datos sean correctos
    if (!nombre || !sede) {
        throw new Error("Datos incompletos o inválidos");
    }
    // Creamos una nueva instancia del modelo Almacen
    const almacen = new Almacen({nombre, sede, ubicacion, responsable, activo});
    return await almacen.save();
};

const obtenerAlmacenes = async (filtros) => {
    try {
        let almacenes;
        if (filtros && Object.keys(filtros).length > 0) {
            // Aplicar filtros a la consulta
            let query = {};
            if (filtros.nombre) {
                query.nombre = { $regex: filtros.nombre, $options: "i" }; // Búsqueda insensible a mayúsculas/minúsculas
            }
            if (filtros.sede) {
                query.sede = mongoose.Types.ObjectId(filtros.sede);
            }
            if (filtros.activo !== undefined) {
                query.activo = filtros.activo;
            }
            almacenes = await Almacen.find(query);
        } else {
            almacenes = await Almacen.find();
        }
        return almacenes;
    } catch (error) {
        throw new Error("Error al obtener almacenes: " + error.message);
    }
};

const obtenerAlmacenPorId = async (id, session = null) => {
    try {
        return await Almacen.findById(id);
    } catch (error) {
        throw new Error("Error al obtener el almacén: " + error.message);
    }
};

const actualizarAlmacen = async (id, data) => {
    try {
        const almacenActualizado = await Almacen.findByIdAndUpdate(id, data, { new: true });
        if (!almacenActualizado) {
            throw new Error("Almacén no encontrado");
        }
        return almacenActualizado;
    } catch (error) {
        throw new Error("Error al actualizar el almacén: " + error.message);
    }    
    
};


const obtenerActivosDeAlmacen = async (almacenId) => {
    try {
        if (!almacenId) {
            throw new Error("El ID del almacén no puede estar vacío");
        }

        if (!mongoose.isValidObjectId(almacenId)) {
            throw new Error("El ID del almacén no es válido");
        }

        const almacen = await Almacen.findById(almacenId);

        if (!almacen) {
            throw new Error("No existe el almacén indicado");
        }

        const activos = await Activo.find({
            almacen: almacen._id
        });

        return activos;

    } catch (error) {
        throw new Error("Error al obtener los activos del almacén: " + error.message);
    }
};

module.exports = {
    crearAlmacen,
    obtenerAlmacenes,
    obtenerAlmacenPorId,
    actualizarAlmacen,
    obtenerActivosDeAlmacen
}