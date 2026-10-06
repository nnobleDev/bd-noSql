/*CRUD de activos.
Buscar activos.
Asignar un activo.
Desasignar un activo.
Trasladar un activo.
Pasar un activo a mantenimiento.
Dar de baja un activo.
Validar estados.
Registrar movimientos asociados a esas operaciones. 

baja           → no se puede asignar
mantenimiento  → no se puede asignar
asignado       → ya tiene empleado
disponible     → normalmente no tiene empleado
*/
const Activo = require('../Models/activo.model')
const productoService = require('./producto.service');
const sedeService = require('./sede.service');
const empleadoService = require('./empleado.service');
const movimientoService = require('./movimiento.service');
const mongoose = require("mongoose");

const crearActivo = async (data) => {
    try {
        let { numeroInventario, idProducto, idSede, idSector, idAlmacen, estado, idUsuario, especificaciones } = data;

        if (!numeroInventario || !idProducto || !idSede) {
            throw new Error("Faltan campos obligatorios");
        }

        let activoAux = await obtenerActivoPorNroInventario(numeroInventario);
        if (activoAux) {
            throw new Error("Ya existe un activo con ese numero de inventario");
        }


        let producto = await productoService.obtenerProductoPorId(idProducto);
        if (!producto) {
            throw new Error("No existe el producto");
        }


        let sede = await sedeService.obtenerSedePorId(idSede);
        if (!sede) {
            throw new Error("No existe la sede");
        }

        let sector = null;
        if (idSector) {
            sector = await sectorService.obtenerSectorPorId(idSector);
            if (!sector) {
                throw new Error("No existe el sector");
            }
        }

        let almacen = null;
        if (idAlmacen) {
            almacen = await almacenService.obtenerAlmacenPorId(idAlmacen);
            if (!almacen) {
                throw new Error("No existe el almacen");
            }
        }

        let empleado = null;
        if (idUsuario) {
            empleado = await empleadoService.obtenerEmpleadoPorId(idUsuario);
            if (!empleado) {
                throw new Error("No existe el empleado que intenta asociar");
            }
        }

        if (estado === "asignado" && !empleado) {
            throw new Error(
                "Un activo asignado debe tener un empleado"
            );
        }

        if (
            (estado === "disponible" ||
                estado === "mantenimiento" ||
                estado === "baja") &&
            empleado
        ) {
            throw new Error(
                `Un activo en estado ${estado} no puede tener un empleado asignado`
            );
        }

        const nuevoActivo = new Activo({
            numeroInventario: numeroInventario,
            producto: producto._id,
            sede: sede._id,
            sector: sector?._id,
            almacen: almacen?._id,
            estado: estado,
            usuarioAsignado: empleado?._id,
            especificaciones: especificaciones

        })

        return nuevoActivo.save();

    } catch (error) {
        throw new Error("Error al crear el activo: " + error.message);
    }
}

const obtenerActivos = async (filtros) => {
    try {
        let activos;
        if (filtros && Object.keys(filtros).length > 0) {
            let query = {};

            if (filtros?.numeroInventario) {
                query.numeroInventario = filtros.numeroInventario;
            }

            if (filtros?.sede) {
                query.sede = filtros.sede;
            }

            if (filtros?.sector) {
                query.sector = filtros.sector;
            }

            if (filtros?.almacen) {
                query.almacen = filtros.almacen;
            }

            if (filtros?.usuarioAsignado) {
                query.usuarioAsignado = filtros.usuarioAsignado;
            }

            if (filtros?.estado) {
                query.estado = filtros.estado;
            }

            activos = Activo.find(query);

        } else {
            activos = Activo.find();
        }
        return activos;
    } catch (error) {
        throw new Error("Error al obtener activos");
    }
}

const obtenerActivoPorId = async (id) => {
    try {
        let activo = await Activo.findById(id)
        return activo;

    } catch (error) {
        throw new Error("Error al obtener activo");
    }
}

const obtenerActivoPorNroInventario = async (nroInventario) => {

    try {
        let activo = await Activo.find({ numeroInventario: nroInventario })
        return activo;
    } catch (error) {
        throw new Error("Error al obtener activo");
    }
}

const actualizarActivo = async (id, data) => {

    try {
        const activoActualizado = await Activo.findByIdAndUpdate(id, data, { new: true });
        if (!activoActualizado) {
            throw new Error("Activo no encontrado");
        }
        return activoActualizado;
    } catch (error) {
        throw new Error("Error al actualizar activo: " + error.message);
    }
}

const asignarActivo = async (activoId, empleadoId) => {

    //Iniciamos una sesion de mongoose para manejar la asignacion como una transaccion dem mongoDb y asi actualizar el activo y crear el movimiento correspondiente.
    //De esta forma si alguna de las operaciones no se concreta, la otra tampoco impacta. O se impactan las dos operacions o ninguna
    const session = await mongoose.startSession();
    //Validamos que existe el activo y el empleado
    try {
        let activoActualizado;

        await session.withTransaction(async () => {
            const empleado = await empleadoService.obtenerEmpleadoPorId(empleadoId, session);
            if (!empleado) {
                throw new Error("Empleado no encontrado");
            }

            const activo = await Activo.findById(activoId).session(session);
            if (!activo) {
                throw new Error("Activo no encontrado");
            }
            //Validamos que el activo este disponible
            if (activo.estado !== "disponible") {
                throw new Error(`No se puede asignar un activo en estado ${activo.estado}`);
            }

            activo.usuarioAsignado = empleado._id;
            activo.estado = "asignado";

            activoActualizado = await activo.save({ session }); //Hacemos el save con session para usar la transaccion

            //Creamos el movimiento de asignacion

            await movimientoService.crearMovimiento({
                activo: activo._id,
                tipo: "asignacion",
                empleado: empleado._id,
                observaciones: `Activo asignado al empleado: ${empleado.nombre} ${empleado.apellido}`
            }, session)

        });
        return activoActualizado;

    } catch (error) {
        throw new Error("Error al asignar el activo: " + error.message);
    } finally {
        await session.endSession(); //cerramos la sesion 
    }
}

async function desasignarActivo(activoId) { }

async function trasladarActivo(activoId, destino) { }

async function enviarAMantenimiento(activoId) { }

async function darDeBajaActivo(activoId) { }

module.exports = {
    crearActivo,
    obtenerActivos,
    obtenerActivoPorId,
    obtenerActivoPorNroInventario,
    actualizarActivo,
    asignarActivo,
    desasignarActivo,
    trasladarActivo,
    enviarAMantenimiento,
    darDeBajaActivo
}