const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

//Ruta para listar todos los productos
router.get('/', productoController.getAllProductos);

//Ruta para listar todos los productos por tipo
router.get('/:tipo', productoController.getAllProductosByTipo);

router.get('/:id', productoController.getProductoById);

//Ruta para crear un nuevo producto
router.post('/', productoController.createProducto);

//Ruta para actualizar un producto
router.put('/:id', productoController.updateProducto);

module.exports = router;
