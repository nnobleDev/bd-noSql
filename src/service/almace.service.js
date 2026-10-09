async function crearAlmacen(data) {}

async function obtenerAlmacenes(filtros) {}

async function obtenerAlmacenPorId(id, session = null) {}

async function actualizarAlmacen(id, data) {}

async function obtenerActivosDeAlmacen(almacenId) {}

module.exports = {
    crearAlmacen,
    obtenerAlmacenes,
    obtenerAlmacenPorId,
    actualizarAlmacen,
    obtenerActivosDeAlmacen
}