const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },

    apellido: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    sector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sector"
    }
  },
  {
    timestamps: true,
    collection: "empleados"
  }
);

module.exports = mongoose.model("Empleado", empleadoSchema);