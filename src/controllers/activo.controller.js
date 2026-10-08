const activoService = require('../service/activo.service');

const activoController = {};


//Listado de los activos registraods
//Tambien podemos aplicar filtros a la consulta pasando parametros a la solicitud(req.query)
activoController.getAllActivos = async (req, res) => {
    try {
        const activos = await activoService.obtenerActivos(req.query);
        if (!activos || activos.length === 0) {
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

//Controller para obtener un activo por Id, el Id viene como parametro de url
activoController.obtenerActivoPorId = async (req, res) => {
    try {
        const activo = await activoService.obtenerActivoPorId(req.params.id);
        if (!activo) {
            return res.status(404).json({
                message: "No se encontro activo"
            });
        }
        res.status(200).json(activo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//Controller para obtener un activo por numero de inventario, el nroInventario viene como parametro de url
activoController.obtenerActivoPorNroInventario = async (req, res) => {
    try {
        const activo = await activoService.obtenerActivoPorNroInventario(req.params.nroInventario);
        if (!activo) {
             return res.status(404).json({
                message: "No se encontro activo"
            });
        }
        res.status(200).json(activo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//Controller para crear un activo, los datos para crear el activo vienen en el body de la peticion
activoController.crearActivo = async (req, res) => {
    try {
        const nuevoActivo = await activoService.crearActivo(req.body);
        res.status(200).json(nuevoActivo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//Controller para actualizar un activo
//El id del activo que se va actualizar llega como parametro de la url y los datos para actualizar llegan en el body de la request
activoController.actualizarActivo = async (req, res) => {
    try {
        const activoActualizado = await activoService.actualizarActivo(req.params.id, req.body);
        res.status(200).json(activoActualizado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


//Controller para asignar un activo a un empleado
activoController.asignarActivo = async (req, res) => {
    try {
        const { idActivo, idEmpleado } = req.body; //desestructuramos el body de la request para quedarnos con el idActivo e idEmpleado y pasarlos al service
        const activoAsignado = await activoService.asignarActivo(idActivo, idEmpleado);
        res.status(200).json(activoAsignado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


//Controller para desasignar un activo, el id del activo lo recibimos por parametro de url
activoController.desasignarActivo = async (req, res) => {
    try {
        const activoDesasignado = await activoService.desasignarActivo(req.params.id);
        res.status(200).json(activoDesasignado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}



//Controller para trasladar un activo, recibimos id del activo como parametro de url y destino como body de la request
activoController.trasladarActivo = async (req, res) => {
    try {
        const activoTrasladado = await activoService.trasladarActivo(req.params.id, req.body);
        res.status(200).json(activoTrasladado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}



//Controller para enviar un activo a mantenimiento, recibimos el id por parametro de url
activoController.enviarAMantenimiento = async (req, res) => {
    try {
        const activoEnMantenimiento = await activoService.enviarAMantenimiento(req.params.id);
        res.status(200).json(activoEnMantenimiento);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}



//Controller para dar de baja un activo, el id del activo lo recibimos como parametro de url
activoController.darDeBajaActivo = async (req, res) => {
    try{
        const activoBajado = await activoService.darDeBajaActivo(req.params.id);
        res.status(200).json(activoBajado);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = activoController;