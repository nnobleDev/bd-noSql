const mongoose = require("mongoose");

const activoSchema = new mongoose.Schema(
    {
        numeroInventario: {
            type: String,
            required: true,
            unique: true
        },

        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Producto",
            required: true
        },

        sede: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sede",
            required: true
        },

        sector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sector"
        },

        almacen: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Almacen",
            default: null
        },

        estado: {
            type: String,
            enum: [
                "disponible",
                "asignado",
                "mantenimiento",
                "baja"
            ],
            default: "disponible"
        },

        usuarioAsignado: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Empleado",
            default: null
        },

        especificaciones: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        fechaAlta: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Activo", activoSchema);