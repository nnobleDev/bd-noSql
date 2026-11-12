const mongoose = require("mongoose");

const almacenSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },

    sede: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sede",
      required: true
    },

    ubicacion: {
      type: String
    },

    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado"
    },

    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: "almacenes"
  }
);

module.exports = mongoose.model("Almacen", almacenSchema);