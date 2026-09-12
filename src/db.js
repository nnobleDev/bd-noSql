const mongoose = require('mongoose');

const dbURI = `mongodb://localhost:${process.env.MONGO_PORT}/${process.env.DB_MONGO}`;

mongoose.connect(dbURI)
  .then(() => {
    console.log('Conectado a MongoDB');
    }) 
  .catch((err) => {
    console.error('Error al conectarse con MongoDB:', err);
  });