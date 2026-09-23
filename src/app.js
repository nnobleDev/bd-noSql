const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config(); // usamos la libreria dotenv para cargar las variables de entorno desde el archivo .env
require('./db');

app.use(morgan('dev')); // Usamos morgan para registrar las solicitudes HTTP en la consola

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use('/api/sede', require('./routes/sede.routes'));
app.use('/api/producto', require('./routes/producto.routes'));


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Servidor levantado en:  http://localhost:${process.env.SERVER_PORT}`);
});