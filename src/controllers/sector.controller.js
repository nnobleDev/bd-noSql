const sectorService = require("../service/sector.service");

const sectorController = {};

//Controller para crear un nuevo sector, los datos los obtenemos del body de la request
sectorController.crearSector = async (req, res) =>{

    try{
        const sector = await sectorService.crearSector(req.body);
        res.status(201).json(sector);
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

//Controller para obtener todos los sectores o en su defecto aplicar un filtro a la busqueda 
//utilizando query params
sectorController.obtenerSectores = async (req, res) =>{
    try{
        const sectores = await sectorService.obtenerSectores(req.query);

        if(!sectores || sectores.length === 0){
            return res.status(404).json({
                message: "No se encontraron sectores"
            })
        }

        res.status(200).json(sectores);
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}


//Controller para obtener un sector por id, el id lo recibimos como parametro de url
sectorController.obtenerSectorPorId = async (req, res) =>{
    try{
        const sector = await sectorService.obtenerSectorPorId(req.params.id);
        if(!sector){
            return res.status(404).json({
                message: "No se econtro sector"
            })
        }

        res.status(200).json(sector);
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//Controller para actualizar un sector, recibimos el id como parametro de url y los datos para actualizar en el body de la request
sectorController.actualizarSector = async (req, res) => {
    try{
        const sectorActualizado = await sectorService.actualizarSector(req.params.id, req.body)
        res.status(200).json(sectorActualizado)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//Controller para obtener los sectores de una sede. Recibimos el id de la sede como parametro de url
sectorController.obtenerSectoresPorSede = async (req, res) => {
    try {
        const sectores = await sectorService.obtenerSectoresPorSede(req.params.sedeId);
        if (sectores.length === 0) {
            return res.status(404).json({
                message: "No se encontraron sectores"
            })
        }
        res.status(200).json(sectores);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = sectorController;