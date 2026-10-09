/* 
Se encarga de la trazabilidad histórica.

Responsabilidades:

Crear movimientos.
Obtener movimientos.
Obtener movimientos de un activo.
Buscar movimientos por tipo.
Buscar movimientos por fecha.
Consultar historial.
*/
async function crearMovimiento(data, session = null) {}

async function obtenerMovimientos(filtros) {}

async function obtenerMovimientoPorId(id) {}

async function obtenerMovimientosPorActivo(activoId) {}

module.exports = {
    crearMovimiento,
    obtenerMovimientos,
    obtenerMovimientoPorId,
    obtenerMovimientosPorActivo
}