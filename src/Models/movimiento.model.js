const mongoose = require("mongoose");

const movimientoSchema = new mongoose.Schema(
  {
    activo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activo",
      required: true
    },

    tipo: {
      type: String,
      required: true,
      enum: [
        "alta",
        "asignacion",
        "desasignacion",
        "traslado",
        "mantenimiento",
        "baja"
      ]
    },

    origen: {
      sede: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sede"
      },

      sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sector"
      }
    },

    destino: {
      sede: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sede"
      },

      sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sector"
      }
    },

    empleado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado"
    },

    fecha: {
      type: Date,
      default: Date.now
    },

    observaciones: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: "movimientos"
  }
);

module.exports = mongoose.model("Movimiento", movimientoSchema);