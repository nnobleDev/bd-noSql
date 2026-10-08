const sedeService = require('../service/sede.service');

const sedeController = {};// Definimos un objeto sedeController que contendrá los métodos para manejar las solicitudes HTTP relacionadas con las sedes.

//Listado de todas las sedes utilizando el metodo find() de Mongoose, que devuelve un array con todos los documentos de la colección Sede.
//Tambien se puede aplicar filtros a la consulta utilizando los parámetros de la solicitud (req.query). Si no se encuentran sedes, devuelve un estado 404 con un mensaje de error; si hay un error en la consulta, devuelve un estado 500 con un mensaje de error.
sedeController.getAllSedes = async (req, res) => {
    try {
        //Por ejemplo podemos recibir en la peticion: GET /api/sede?ciudad=Montevideo&nombre=Centro
        //req.query trasformara esto en un objeto: { ciudad: 'Montevideo', nombre: 'Centro' } y mongoose lo usara para filtrar la busqueda en la base de datos.
        const sedes = await sedeService.obtenerSedes(req.query);

        if (!sedes || sedes.length === 0) {
            return res.status(404).json({
                message: "No se encontraron sedes"
            });
        }

        res.status(200).json(sedes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Controller para crear una nueva sede utilizando el servicio crearSede del archivo sede.service.js. Este método recibe los datos de la nueva sede desde el cuerpo de la solicitud (req.body) y llama al servicio para crearla. Si la creación es exitosa, devuelve un estado 201 con la nueva sede en formato JSON; si hay un error, devuelve un estado 400 con un mensaje de error.
sedeController.crearSede = async (req, res) => {
    try {
        const nuevaSede = await sedeService.crearSede(req.body);
        res.status(201).json(nuevaSede);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Controller para obtener una sede específica por su ID. Este método recibe el ID de la sede desde los parámetros de la solicitud (req.params.id) y utiliza el método findById de Mongoose para buscarla en la base de datos. Si se encuentra la sede, devuelve un estado 200 con la sede en formato JSON; si no se encuentra, devuelve un estado 404 con un mensaje de error; si hay un error en la búsqueda, devuelve un estado 500 con un mensaje de error.
sedeController.obtenerSedePorId = async (req, res) => {
    try {
        const sede = await sedeService.obtenerSedePorId(req.params.id);
        if (!sede) {
            return res.status(404).json({ message: "Sede no encontrada" });
        }
        res.status(200).json(sede);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Controller para actualizar una sede existente. 
// Este método recibe el ID de la sede desde los parámetros de la solicitud (req.params.id) y los datos actualizados desde el cuerpo de la solicitud (req.body). 
// Llama al servicio actualizarSede para realizar la actualización en la base de datos. 
// Si la actualización es exitosa, devuelve un estado 200 con la sede actualizada en formato JSON; si no se encuentra la sede, devuelve un estado 404 con un mensaje de error; si hay un error en la actualización, devuelve un estado 500 con un mensaje de error.
sedeController.actualizarSede = async (req, res) => {
    try {
        const sedeActualizada = await sedeService.actualizarSede(req.params.id, req.body);  
        res.status(200).json(sedeActualizada);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Controller para obtener todos los activos asociados a una sede específica.
// Este método recibe el ID de la sede desde los parámetros de la solicitud (req.params.id) y llama al servicio obtenerActivosPorSede para obtener los activos relacionados con esa sede. 
// Si la operación es exitosa, devuelve un estado 200 con los activos en formato JSON; si hay un error, devuelve un estado 500 con un mensaje de error.
sedeController.obtenerActivosPorSede = async (req, res) => {
    try {
        const sedeId = req.params.id;
        const activos= await sedeService.obtenerActivosPorSede(req.params.id);
        res.status(200).json(activos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = sedeController;