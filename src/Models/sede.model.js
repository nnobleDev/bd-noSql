const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    direccion: {
      calle: String,
      numero: String,
      ciudad: String
    },

    activa: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Sede", sedeSchema);