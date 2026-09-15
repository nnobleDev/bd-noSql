const mongoose = require("mongoose");
const { PRODUCT_TYPES } = require("./enums/productTypes.enum");


const productoSchema = new mongoose.Schema(
  {
    fabricante: {
      type: String,
      required: true
    },

    modelo: {
      type: String,
      required: true
    },

    tipo: {
      type: String,
      required: true,
      enum: PRODUCT_TYPES
    },

    descripcion: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: "productos"
  }
);

module.exports = mongoose.model("Producto", productoSchema);