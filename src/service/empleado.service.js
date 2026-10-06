async function crearEmpleado(data) {}

async function obtenerEmpleados(filtros) {}

async function obtenerEmpleadoPorId(id, session= null) {}

async function actualizarEmpleado(id, data) {}

async function eliminarEmpleado(id) {}

async function obtenerActivosAsignados(empleadoId) {} // puede ir en reporte.service



module.exports = {
    crearEmpleado,
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    actualizarEmpleado,
    eliminarEmpleado,
    obtenerActivosAsignados
}