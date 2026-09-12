const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv').config(); // usamos la libreria dotenv para cargar las variables de entorno desde el archivo .env

const db = require('./db');

app.use(morgan('dev')); // Usamos morgan para registrar las solicitudes HTTP en la consola


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Servidor levantado en:  http://localhost:${process.env.SERVER_PORT}`);
});