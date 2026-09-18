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

async function crearActivo(data) {}

async function obtenerActivos(filtros) {}

async function obtenerActivoPorId(id) {}

async function actualizarActivo(id, data) {}

async function eliminarActivo(id) {}

async function asignarActivo(activoId, empleadoId) {}

async function desasignarActivo(activoId) {}

async function trasladarActivo(activoId, destino) {}

async function enviarAMantenimiento(activoId) {}

async function darDeBajaActivo(activoId) {}