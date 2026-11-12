const Sede = require("../Models/sede.model");
const mongoose = require("mongoose");
const crearSede = (data) => {
    
    const { nombre, direccion, activa } = data;

    //Validamos que los datos sean correctos
    if(!nombre || !direccion || typeof activa !== "boolean") {
        throw new Error("Datos incompletos o inválidos");
    }

    // Creamos una nueva instancia del modelo Sede
    const nuevaSede = new Sede({
        nombre,
        direccion,
        activa
    });

    return nuevaSede.save();
}

const obtenerSedes = async (filtros) => {
    try {
        let sedes; 
        if(filtros && Object.keys(filtros).length > 0) {
            // Aplicar filtros a la consulta
            let query = {};
            if (filtros.nombre) {
                query.nombre = { $regex: filtros.nombre, $options: "i" }; // Búsqueda insensible a mayúsculas/minúsculas
            }
            if (filtros.ciudad) {
                query["direccion.ciudad"] = { $regex: filtros.ciudad, $options: "i" };
            }
            sedes = await Sede.find(query);
        } else {
            sedes = await Sede.find();
        }
        return sedes;
    } catch (error) {
        throw new Error("Error al obtener las sedes: " + error.message);
    }
}

const obtenerSedePorId = async (id, session = null) => {
    try {
        const sede = await Sede.findById(id).session(session);
        return sede;
    } catch (error) {
        throw new Error("Error al obtener la sede por ID: " + error.message);
    }
}

const actualizarSede = async (id, data) => {
    try{
        //Utilizamos el método findByIdAndUpdate de Mongoose para actualizar la sede con el ID proporcionado y los datos nuevos. 
        //La opción { new: true } asegura que se devuelva el documento actualizado ya que por defecto findByIdAndUpdate devuelve el documento original antes de la actualización.        
        const sedeActualizada = await Sede.findByIdAndUpdate(id, data, { new: true });
        if (!sedeActualizada) {
            throw new Error("Sede no encontrada");
        }
        return sedeActualizada;
    } catch (error) {
        throw new Error("Error al actualizar la sede: " + error.message);
    }
}

//ACA USAMOS AGGREGATE PARA OBTENER LOS ACTIVOS DE UNA SEDE CON LOOKUP, 
// PERO NO FUNCIONA, PORQUE EL CAMPO SEDE EN ACTIVO ES UN OBJECTID Y NO UN STRING, 
// ASI QUE NO PUEDE HACER MATCH. HAY QUE CONVERTIR EL OBJECTID A STRING O USAR $toObjectId EN LA PIPELINE DE AGGREGATE.
const obtenerActivosDeSede = async (sedeId) =>{
    try {
        const resultado = await Sede.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(sedeId) }
            },
            {
                $lookup: {
                    from: "activos",
                    localField: "_id",
                    foreignField: "sede",
                    as: "activos"
                }
            },
            {
                $project: {
                    _id: 0,
                    activos: 1,
                }
            }
        ]);
        return resultado[0]?.activos || [];
    } catch (error) {
        throw new Error("Error al obtener los activos de la sede: " + error.message);
    }
}

module.exports = {
  crearSede,
  obtenerSedes,
  obtenerSedePorId,
  actualizarSede,
  obtenerActivosDeSede
};