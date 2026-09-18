const express = require('express');
const router = express.Router();

//Ruta para listar todas las sedes
router.get('/', (req, res) => {
    res.send('Bienvenido a la API de sedes');
 });

 //Ruta para crear una nueva sede
router.post('/', (req, res) => {
    res.send('Crear una nueva sede');
 });

//Ruta para obtener una sede específica
router.get('/:id', (req, res) => {
    res.send('Obtener una sede específica');
 });

//Ruta para actualizar una sede
router.put('/:id', (req, res) => {
    res.send('Actualizar una sede');
 });

//Ruta para eliminar una sede
router.delete('/:id', (req, res) => {
    res.send('Eliminar una sede');
 });

module.exports = router;