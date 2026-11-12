const Sede = require("../Models/sede.model");
const Activo = require("../Models/activo.model");
const Movimiento = require("../Models/movimiento.model");


//Resumen de inventario por sede, incluyendo el total de activos y la cantidad de activos en cada estado (disponible, asignado, mantenimiento, baja)
const obtenerResumenInventario = async () => {
    try {
        const resultado = await Sede.aggregate([
            {
                $lookup: {
                    from: "activos",
                    localField: "_id",
                    foreignField: "sede",
                    as: "activos"
                }
            },
            {
                $project: {
                    _id: 0,
                    sede: "$nombre",
                    total: { $size: "$activos" },

                    disponibles: {
                        $size: {
                            $filter: {
                                input: "$activos",
                                as: "activo",
                                cond: { $eq: ["$$activo.estado", "disponible"] }
                            }
                        }
                    },

                    asignados: {
                        $size: {
                            $filter: {
                                input: "$activos",
                                as: "activo",
                                cond: { $eq: ["$$activo.estado", "asignado"] }
                            }
                        }
                    },

                    mantenimiento: {
                        $size: {
                            $filter: {
                                input: "$activos",
                                as: "activo",
                                cond: { $eq: ["$$activo.estado", "mantenimiento"] }
                            }
                        }
                    },

                    baja: {
                        $size: {
                            $filter: {
                                input: "$activos",
                                as: "activo",
                                cond: { $eq: ["$$activo.estado", "baja"] }
                            }
                        }
                    }
                }
            },
            {
                $sort: {
                    sede: 1
                }
            }
        ]);

        return resultado;

    } catch (error) {
        throw new Error(
            "Error al obtener el resumen de activos por sede: " + error.message
        );
    }
};

// Historial de movimientos de un activo específico, incluyendo la fecha, tipo de movimiento, origen, destino y empleado 
const obtenerHistorialActivo = async (activoId) => {
    try {
        if (!mongoose.isValidObjectId(activoId)) {
            throw new Error("El ID del activo no es válido");
        }

        const activo = await Activo.findById(activoId);

        if (!activo) {
            throw new Error("Activo no encontrado");
        }

        const reporte = await Movimiento.find({
            activo: activo._id
        })
            .sort({ fecha: 1 })
            .select({
                _id: 0,
                fecha: 1,
                tipo: 1,
                origen: 1,
                destino: 1,
                empleado: 1,
                observaciones: 1
            });

        return reporte;

    } catch (error) {
        throw new Error(
            "Error al obtener el historial del activo: " + error.message
        );
    }
};

// Reporte de movimientos por tipo y periodo de fechas
const obtenerMovimientosPorTipoYFecha = async (fechaInicio, fechaFin) => {
    try {
        if (!fechaInicio || !fechaFin) {
            throw new Error("Las fechas de inicio y fin son obligatorias");
        }

        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);

        if (
            isNaN(fechaInicioDate.getTime()) ||
            isNaN(fechaFinDate.getTime())
        ) {
            throw new Error("Las fechas ingresadas no son válidas");
        }

        if (fechaInicioDate >= fechaFinDate) {
            throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
        }

        const reporte = await Movimiento.aggregate([
            {
                $match: {
                    fecha: {
                        $gte: fechaInicioDate,
                        $lt: fechaFinDate
                    }
                }
            },
            {
                $group: {
                    _id: "$tipo",
                    cantidad: { $sum: 1 }
                }
            },
            {
                $sort: {
                    cantidad: -1
                }
            }
        ]);

        return reporte;

    } catch (error) {
        throw new Error(
            "Error al obtener el reporte de movimientos por tipo y fecha: " + error.message
        );
    }
};


module.exports = {
    obtenerResumenInventario,
    obtenerHistorialActivo,
    obtenerMovimientosPorTipoYFecha
};