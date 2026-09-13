const {Sede} = require('../Models');


const sedeController = {};// Definimos un objeto sedeController que contendrá los métodos para manejar las solicitudes HTTP relacionadas con las sedes.

//Listado de todas las sedes utilizando el metodo find() de Mongoose, que devuelve un array con todos los documentos de la colección Sede.
sedeController.getAllSedes = async (req, res) => {
    try {
        const sedes = await Sede.find();    
        res.json(sedes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = sedeController;