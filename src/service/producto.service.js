const Producto = require('../Models/producto.model');

const crearProducto = (data) => {
    
    const {fabrincante, modelo, tipo, descripcion} = data;

    if(!fabrincante || !modelo || !tipo) {
        throw new Error("Faltan campos obligatorios");
    }

    const nuevoProducto = new Producto({
        fabricante: fabrincante,
        modelo,
        tipo,
        descripcion
    });

    return nuevoProducto.save();

};

const obtenerProductos = async () => {

    try {
        let productos = await Producto.find();
        return productos;
    } catch (error) {
        throw new Error("Error al obtener los productos: " + error.message);
    }

};

const obtenerProductoPorId = async (id, session = null) =>{
    try {
        const producto = await Producto.findById(id).session(session);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return producto;
    } catch (error) {
        throw new Error("Error al obtener el producto por ID: " + error.message);
    }
}

const actualizarProducto = async (id, data) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, data, { new: true });
        if (!productoActualizado) {
            throw new Error("Producto no encontrado");
        }
        return productoActualizado;
    } catch (error) {
        throw new Error("Error al actualizar el producto: " + error.message);
    }
}

const obtenerProductosPorTipo = async (tipo) => {
    try {
        const productos = await Producto.find({ tipo });
        return productos;
    } catch (error) {
        throw new Error("Error al obtener los productos por tipo: " + error.message);
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    obtenerProductosPorTipo
};