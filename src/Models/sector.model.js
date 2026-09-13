const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    sede: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sede",
      required: true
    },

    piso: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Sector", sectorSchema);