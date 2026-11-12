const Producto = require('../Models/producto.model');
const productoService = require('../service/producto.service');

const productoController = {};


productoController.getAllProductos = async (req, res) => {
    try {
        const productos = await productoService.obtenerProductos();
        if (!productos || productos.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


productoController.getAllProductosByTipo = async (req, res) => {
    try {
        const tipo = req.params.tipo;
        const productos = await productoService.obtenerProductosPorTipo(tipo);
        if (!productos || productos.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

productoController.getProductoById = async (req, res) => {
    try {
        const producto = await productoService.obtenerProductoPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }   
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

productoController.createProducto = async (req, res) => {
    try {
        const nuevoProducto = await productoService.crearProducto(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

productoController.updateProducto = async (req, res) => {
    try {
        const productoActualizado = await productoService.actualizarProducto(req.params.id, req.body);
        if (!productoActualizado) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
module.exports = productoController;



