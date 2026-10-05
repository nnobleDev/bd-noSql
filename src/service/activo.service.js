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

async function actualizarActivo(id, data) { }

async function asignarActivo(activoId, empleadoId) { }

async function desasignarActivo(activoId) { }

async function trasladarActivo(activoId, destino) { }

async function enviarAMantenimiento(activoId) { }

async function darDeBajaActivo(activoId) { }