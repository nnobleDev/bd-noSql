const activoService = require('../service/activo.service');

const activoController = {};


//Listado de los activos registraods
//Tambien podemos aplicar filtros a la consulta pasando parametros a la solicitud(req.query)
activoController.getAllActivos = async (req, res) => {
    try {
        const activos = await activoService.obtenerActivos(req.query);
        if(!activos || activos.length === 0){
            return res.status(404).json({
                message: "No se encontraron activos"
            });
        }

        res.status(200).json(activos);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

activoController.obtenerActivoPorId = async (req, res) => {
    try{
        const activo = await activoService.obtenerActivoPorId(req.params.id);
        if(!activo){
            return res.status(404).json({
                message: "No se encontro activo"
            });
        }
        res.status(200).json(activo);
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = activoController;