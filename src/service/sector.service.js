const Sector = require("../Models/sector.model");

const sedeService = require("../service/sede.service");

const crearSector = async (data) =>{
    try{
        const{nombre, sede, piso} = data;

        if(!nombre || nombre.trim().length === 0){
            throw new Error("El nombre no puede ser vacio o nulo");
        }

        if(!sede || sede.trim().length === 0) {
            throw new Error("Debe ingresar identificador de sede");
        }

        const sedeBuscada = await sedeService.obtenerSedePorId(sede);
        if(!sedeBuscada){
            throw new Error("No existe la sede ingresada ");
        }

        const nuevoSector = new Sector({
            nombre,
            sede,
            piso
        });

        return await nuevoSector.save();
    } catch(error){
        throw new Error("Error al crear sector: " +error.message);
    }
}

const obtenerSectores = async (filtros) => {
    try{
        let sectores;
        if(filtros && Object.keys(filtros).length >0){
            let query ={};
            
            if(filtros.nombre) {
                query.nombre = {$regex: filtros.nombre, $options: "i"}
            }
            
            if(filtros.sede){
                query.sede = filtros.sede
            }

            const sedeBuscada = await sedeService.obtenerSedePorId(filtros.sede);
            if(!sedeBuscada) {
                throw new Error("No existe la sede buscada");
            }
            sectores = await Sector.find(query);
        } else {
            sectores = await Sector.find()
        }
        return sectores;
    } catch(error){
        throw new Error("Error al obtener sectores: "+error.message );
    }
}

const obtenerSectorPorId = async (id, session = null) => {
    try{
        if(!id){
            throw new Error("id no puede ser vacio ni nulo");
        }
        const sector = await Sector.findById(id).session(session);
        return sector;
    } catch (error) {
        throw new Error("Error al obtener sector: " + error.message )
    }
}

const actualizarSector = async (id, data) => {
    try{
        const sectorBuscado = await Sector.findByIdAndUpdate(id, data, {new: true});

        if(!sectorBuscado){
            throw new Error("No existe el sector buscado");
        }
        return sectorBuscado;
    } catch(error){
        throw new Error("Error al actualizar el sector: "+error.message);
    }
}

const obtenerSectoresPorSede = async (sedeId) => {
    try {
        if (!sedeId) {
            throw new Error("sedeId no puede ser vacío ni nulo");
        }

        const sedeBuscada = await sedeService.obtenerSedePorId(sedeId);

        if (!sedeBuscada) {
            throw new Error("No existe la sede buscada");
        }

        return await Sector.find({
            sede: sedeBuscada._id
        });

    } catch (error) {
        throw new Error(
            "Error al obtener sectores por sede: " + error.message
        );
    }
};

module.exports = {
    crearSector,
    obtenerSectores,
    obtenerSectorPorId,
    actualizarSector,
    obtenerSectoresPorSede
}