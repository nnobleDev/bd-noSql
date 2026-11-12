const Movimiento = require('../Models/movimiento.model')
const activoService = require('../service/activo.service');

//Este metodo no sera expuesto por api. Los movimientos los van a crear las acciones sobre los activos
const crearMovimiento = async (data, session = null) => {
    try {
        const { activo, tipo, origen, destino, empleado, observaciones } = data;

        if (!activo) {
            throw new Error("El activo no puede ser vacio")
        }
        if (!tipo) {
            throw new Error("El tipo no puede ser vacio");
        }
        if (tipo === "asignacion" && !empleado) {
            throw new Error("El empleado no puede ser vacio");
        }

        if (!origen) {
            throw new Error("El destino no puede ser vacio")
        }

        if (!destino) {
            throw new Error("El destino no puede ser vacio");
        }

        const nuevoMovimiento = new Movimiento({
            activo,
            tipo,
            origen,
            destino,
            empleado,
            observaciones
        });

        return await nuevoMovimiento.save();
    } catch (error) {
        throw new Error("Error al crear movimiento")
    }
}


const obtenerMovimientos = async (filtros = {}) => {
    try {
        const query = {};

        if (filtros.activo) {
            query.activo = filtros.activo;
        }

        if (filtros.tipo) {
            query.tipo = filtros.tipo;
        }

        if (filtros.empleado) {
            query.empleado = filtros.empleado;
        }

        if (filtros.origenSede) {
            query["origen.sede"] = filtros.origenSede;
        }

        if (filtros.origenSector) {
            query["origen.sector"] = filtros.origenSector;
        }

        if (filtros.origenAlmacen) {
            query["origen.almacen"] = filtros.origenAlmacen;
        }

        if (filtros.destinoSede) {
            query["destino.sede"] = filtros.destinoSede;
        }

        if (filtros.destinoSector) {
            query["destino.sector"] = filtros.destinoSector;
        }

        if (filtros.destinoAlmacen) {
            query["destino.almacen"] = filtros.destinoAlmacen;
        }

        if (filtros.fechaDesde || filtros.fechaHasta) {
            query.fecha = {};

            if (filtros.fechaDesde) {
                query.fecha.$gte = new Date(filtros.fechaDesde);
            }

            if (filtros.fechaHasta) {
                query.fecha.$lte = new Date(filtros.fechaHasta);
            }
        }

        return await Movimiento.find(query).sort({ fecha: -1 });

    } catch (error) {
        throw new Error(
            "Error al obtener movimientos: " + error.message
        );
    }
};



const obtenerMovimientoPorId = async (id) => {
    try {
        const movimiento = await Movimiento.findById(id);
        return movimiento;
    } catch (error) {
        throw new Error("Error al obtener movimiento");
    }
}

const obtenerMovimientosPorActivo = async(activoId) =>{

    try{
        if(!activoId){
            throw new Error("El id activo no puede ser vacio");
        }
        
        const activo = await activoService.obtenerActivoPorId(activoId);
        
        if(!activo){
            throw new Error("No existe el activo");
        }

        const movimientos = await Movimiento.find({activo: activoId}).sort({fecha: -1});
        return movimientos;

    } catch (error){
        throw new Error("Error al obtener movimientos por activo");
    }
 }

module.exports = {
    crearMovimiento,
    obtenerMovimientos,
    obtenerMovimientoPorId,
    obtenerMovimientosPorActivo
}