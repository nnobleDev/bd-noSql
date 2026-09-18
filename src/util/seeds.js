// ============================================================
// SEED - Gestión de Activos Tecnológicos
// MongoDB / mongosh
// ============================================================

// Seleccionar base de datos
use("inventario");

// ============================================================
// 1. LIMPIAR DATOS EXISTENTES
// ============================================================

db.movimientos.deleteMany({});
db.activos.deleteMany({});
db.almacenes.deleteMany({});
db.empleados.deleteMany({});
db.sectores.deleteMany({});
db.productos.deleteMany({});
db.sedes.deleteMany({});


// ============================================================
// 2. IDs
// ============================================================

// Sedes
const sedeMontevideo = ObjectId("650000000000000000000001");
const sedeCanelones = ObjectId("650000000000000000000002");
const sedeMaldonado = ObjectId("650000000000000000000003");

// Sectores
const sectorSistemas = ObjectId("650000000000000000000101");
const sectorAdministracion = ObjectId("650000000000000000000102");
const sectorRRHH = ObjectId("650000000000000000000103");
const sectorContabilidad = ObjectId("650000000000000000000104");
const sectorSoporte = ObjectId("650000000000000000000105");
const sectorDireccion = ObjectId("650000000000000000000106");

// Empleados
const empleadoAna = ObjectId("650000000000000000000201");
const empleadoBruno = ObjectId("650000000000000000000202");
const empleadoCarla = ObjectId("650000000000000000000203");
const empleadoDiego = ObjectId("650000000000000000000204");
const empleadoElena = ObjectId("650000000000000000000205");
const empleadoFederico = ObjectId("650000000000000000000206");

// Productos
const productoDellLatitude = ObjectId("650000000000000000000301");
const productoDellOptiplex = ObjectId("650000000000000000000302");
const productoLenovoThinkpad = ObjectId("650000000000000000000303");
const productoHPProbook = ObjectId("650000000000000000000304");
const productoHPPrinter = ObjectId("650000000000000000000305");
const productoEpsonScanner = ObjectId("650000000000000000000306");
const productoDellMonitor = ObjectId("650000000000000000000307");
const productoCiscoSwitch = ObjectId("650000000000000000000308");

// Almacenes
const almacenMontevideo = ObjectId("650000000000000000000401");
const almacenCanelones = ObjectId("650000000000000000000402");
const almacenMaldonado = ObjectId("650000000000000000000403");

// Activos
const activo001 = ObjectId("650000000000000000001001");
const activo002 = ObjectId("650000000000000000001002");
const activo003 = ObjectId("650000000000000000001003");
const activo004 = ObjectId("650000000000000000001004");
const activo005 = ObjectId("650000000000000000001005");
const activo006 = ObjectId("650000000000000000001006");
const activo007 = ObjectId("650000000000000000001007");
const activo008 = ObjectId("650000000000000000001008");
const activo009 = ObjectId("650000000000000000001009");
const activo010 = ObjectId("650000000000000000001010");
const activo011 = ObjectId("650000000000000000001011");
const activo012 = ObjectId("650000000000000000001012");


// ============================================================
// 3. SEDES
// ============================================================

db.sedes.insertMany([
  {
    _id: sedeMontevideo,
    nombre: "Sede Montevideo",
    direccion: {
      calle: "Av. Italia",
      numero: "6201",
      ciudad: "Montevideo"
    },
    activa: true
  },
  {
    _id: sedeCanelones,
    nombre: "Sede Canelones",
    direccion: {
      calle: "Treinta y Tres",
      numero: "245",
      ciudad: "Canelones"
    },
    activa: true
  },
  {
    _id: sedeMaldonado,
    nombre: "Sede Maldonado",
    direccion: {
      calle: "Sarandí",
      numero: "850",
      ciudad: "Maldonado"
    },
    activa: true
  }
]);


// ============================================================
// 4. SECTORES
// ============================================================

db.sectores.insertMany([
  {
    _id: sectorSistemas,
    nombre: "Sistemas",
    sede: sedeMontevideo,
    piso: 2
  },
  {
    _id: sectorAdministracion,
    nombre: "Administración",
    sede: sedeMontevideo,
    piso: 1
  },
  {
    _id: sectorRRHH,
    nombre: "Recursos Humanos",
    sede: sedeMontevideo,
    piso: 1
  },
  {
    _id: sectorContabilidad,
    nombre: "Contabilidad",
    sede: sedeCanelones,
    piso: 2
  },
  {
    _id: sectorSoporte,
    nombre: "Soporte Técnico",
    sede: sedeCanelones,
    piso: 1
  },
  {
    _id: sectorDireccion,
    nombre: "Dirección",
    sede: sedeMaldonado,
    piso: 2
  }
]);


// ============================================================
// 5. EMPLEADOS
// ============================================================

db.empleados.insertMany([
  {
    _id: empleadoAna,
    nombre: "Ana",
    apellido: "Pérez",
    email: "ana.perez@empresa.com",
    sector: sectorSistemas
  },
  {
    _id: empleadoBruno,
    nombre: "Bruno",
    apellido: "Rodríguez",
    email: "bruno.rodriguez@empresa.com",
    sector: sectorAdministracion
  },
  {
    _id: empleadoCarla,
    nombre: "Carla",
    apellido: "Gómez",
    email: "carla.gomez@empresa.com",
    sector: sectorRRHH
  },
  {
    _id: empleadoDiego,
    nombre: "Diego",
    apellido: "Martínez",
    email: "diego.martinez@empresa.com",
    sector: sectorContabilidad
  },
  {
    _id: empleadoElena,
    nombre: "Elena",
    apellido: "Silva",
    email: "elena.silva@empresa.com",
    sector: sectorSoporte
  },
  {
    _id: empleadoFederico,
    nombre: "Federico",
    apellido: "Fernández",
    email: "federico.fernandez@empresa.com",
    sector: sectorDireccion
  }
]);


// ============================================================
// 6. PRODUCTOS
// ============================================================

db.productos.insertMany([
  {
    _id: productoDellLatitude,
    fabricante: "Dell",
    modelo: "Latitude 5440",
    tipo: "NOTEBOOK",
    descripcion: "Notebook corporativa"
  },
  {
    _id: productoDellOptiplex,
    fabricante: "Dell",
    modelo: "OptiPlex 7010",
    tipo: "DESKTOP",
    descripcion: "PC de escritorio corporativa"
  },
  {
    _id: productoLenovoThinkpad,
    fabricante: "Lenovo",
    modelo: "ThinkPad E14",
    tipo: "NOTEBOOK",
    descripcion: "Notebook para uso administrativo"
  },
  {
    _id: productoHPProbook,
    fabricante: "HP",
    modelo: "ProBook 450",
    tipo: "NOTEBOOK",
    descripcion: "Notebook corporativa"
  },
  {
    _id: productoHPPrinter,
    fabricante: "HP",
    modelo: "LaserJet Pro M404",
    tipo: "IMPRESORA",
    descripcion: "Impresora láser de red"
  },
  {
    _id: productoEpsonScanner,
    fabricante: "Epson",
    modelo: "WorkForce DS-530",
    tipo: "ESCANER",
    descripcion: "Escáner documental"
  },
  {
    _id: productoDellMonitor,
    fabricante: "Dell",
    modelo: "P2422H",
    tipo: "MONITOR",
    descripcion: "Monitor 24 pulgadas"
  },
  {
    _id: productoCiscoSwitch,
    fabricante: "Cisco",
    modelo: "CBS350-24T",
    tipo: "SWITCH",
    descripcion: "Switch administrable de red"
  }
]);


// ============================================================
// 7. ALMACENES
// ============================================================

db.almacenes.insertMany([
  {
    _id: almacenMontevideo,
    nombre: "Depósito Tecnológico Montevideo",
    sede: sedeMontevideo,
    ubicacion: "Planta baja - Depósito A",
    responsable: empleadoElena,
    activo: true
  },
  {
    _id: almacenCanelones,
    nombre: "Depósito Tecnológico Canelones",
    sede: sedeCanelones,
    ubicacion: "Planta baja - Depósito B",
    responsable: empleadoElena,
    activo: true
  },
  {
    _id: almacenMaldonado,
    nombre: "Depósito Tecnológico Maldonado",
    sede: sedeMaldonado,
    ubicacion: "Planta baja - Depósito C",
    responsable: empleadoFederico,
    activo: true
  }
]);


// ============================================================
// 8. ACTIVOS
// ============================================================

db.activos.insertMany([
  {
    _id: activo001,
    numeroInventario: "INV-0001",
    producto: productoDellLatitude,
    sede: sedeMontevideo,
    sector: sectorSistemas,
    almacen: null,
    estado: "asignado",
    usuarioAsignado: empleadoAna,
    especificaciones: {
      procesador: "Intel Core i5",
      ramGB: 16,
      almacenamiento: "SSD 512GB",
      sistemaOperativo: "Windows 11"
    },
    fechaAlta: new Date("2025-01-15")
  },

  {
    _id: activo002,
    numeroInventario: "INV-0002",
    producto: productoDellOptiplex,
    sede: sedeMontevideo,
    sector: sectorAdministracion,
    almacen: null,
    estado: "asignado",
    usuarioAsignado: empleadoBruno,
    especificaciones: {
      procesador: "Intel Core i5",
      ramGB: 16,
      almacenamiento: "SSD 512GB",
      sistemaOperativo: "Windows 11"
    },
    fechaAlta: new Date("2025-02-10")
  },

  {
    _id: activo003,
    numeroInventario: "INV-0003",
    producto: productoLenovoThinkpad,
    sede: sedeMontevideo,
    sector: sectorRRHH,
    almacen: null,
    estado: "asignado",
    usuarioAsignado: empleadoCarla,
    especificaciones: {
      procesador: "AMD Ryzen 5",
      ramGB: 16,
      almacenamiento: "SSD 1TB",
      sistemaOperativo: "Windows 11"
    },
    fechaAlta: new Date("2025-03-05")
  },

  {
    _id: activo004,
    numeroInventario: "INV-0004",
    producto: productoHPProbook,
    sede: sedeCanelones,
    sector: sectorContabilidad,
    almacen: null,
    estado: "asignado",
    usuarioAsignado: empleadoDiego,
    especificaciones: {
      procesador: "Intel Core i7",
      ramGB: 16,
      almacenamiento: "SSD 512GB",
      sistemaOperativo: "Windows 11"
    },
    fechaAlta: new Date("2025-03-20")
  },

  {
    _id: activo005,
    numeroInventario: "INV-0005",
    producto: productoHPPrinter,
    sede: sedeMontevideo,
    sector: sectorAdministracion,
    almacen: null,
    estado: "disponible",
    usuarioAsignado: null,
    especificaciones: {
      tecnologia: "Laser",
      color: true,
      red: true
    },
    fechaAlta: new Date("2025-04-01")
  },

  {
    _id: activo006,
    numeroInventario: "INV-0006",
    producto: productoEpsonScanner,
    sede: sedeCanelones,
    sector: sectorSoporte,
    almacen: null,
    estado: "mantenimiento",
    usuarioAsignado: null,
    especificaciones: {
      tipo: "Documental",
      alimentadorAutomatico: true,
      resolucionDPI: 600
    },
    fechaAlta: new Date("2025-04-12")
  },

  {
    _id: activo007,
    numeroInventario: "INV-0007",
    producto: productoDellMonitor,
    sede: sedeMontevideo,
    sector: sectorSistemas,
    almacen: null,
    estado: "disponible",
    usuarioAsignado: null,
    especificaciones: {
      pulgadas: 24,
      resolucion: "1920x1080",
      panel: "IPS"
    },
    fechaAlta: new Date("2025-05-03")
  },

  {
    _id: activo008,
    numeroInventario: "INV-0008",
    producto: productoDellLatitude,
    sede: sedeMaldonado,
    sector: sectorDireccion,
    almacen: null,
    estado: "asignado",
    usuarioAsignado: empleadoFederico,
    especificaciones: {
      procesador: "Intel Core i7",
      ramGB: 32,
      almacenamiento: "SSD 1TB",
      sistemaOperativo: "Windows 11"
    },
    fechaAlta: new Date("2025-05-15")
  },

  {
    _id: activo009,
    numeroInventario: "INV-0009",
    producto: productoCiscoSwitch,
    sede: sedeCanelones,
    sector: sectorSoporte,
    almacen: null,
    estado: "asignado",
    usuarioAsignado: empleadoElena,
    especificaciones: {
      puertos: 24,
      velocidad: "1Gbps",
      administrable: true
    },
    fechaAlta: new Date("2025-06-01")
  },

  {
    _id: activo010,
    numeroInventario: "INV-0010",
    producto: productoHPPrinter,
    sede: sedeMaldonado,
    sector: sectorDireccion,
    almacen: almacenMaldonado,
    estado: "disponible",
    usuarioAsignado: null,
    especificaciones: {
      tecnologia: "Laser",
      color: false,
      red: true
    },
    fechaAlta: new Date("2025-06-15")
  },

  {
    _id: activo011,
    numeroInventario: "INV-0011",
    producto: productoDellOptiplex,
    sede: sedeMontevideo,
    sector: null,
    almacen: almacenMontevideo,
    estado: "disponible",
    usuarioAsignado: null,
    especificaciones: {
      procesador: "Intel Core i5",
      ramGB: 8,
      almacenamiento: "SSD 256GB",
      sistemaOperativo: "Windows 11"
    },
    fechaAlta: new Date("2025-07-01")
  },

  {
    _id: activo012,
    numeroInventario: "INV-0012",
    producto: productoLenovoThinkpad,
    sede: sedeCanelones,
    sector: sectorSoporte,
    almacen: almacenCanelones,
    estado: "baja",
    usuarioAsignado: null,
    especificaciones: {
      procesador: "Intel Core i5",
      ramGB: 8,
      almacenamiento: "SSD 256GB",
      motivoBaja: "Equipo obsoleto"
    },
    fechaAlta: new Date("2024-08-10")
  }
]);


// ============================================================
// 9. MOVIMIENTOS / HISTORIAL
// ============================================================

db.movimientos.insertMany([

  // ----------------------------
  // INV-0001
  // Alta
  // ----------------------------
  {
    activo: activo001,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeMontevideo,
      sector: sectorSistemas
    },
    empleado: null,
    fecha: new Date("2025-01-15"),
    observaciones: "Alta inicial del activo"
  },

  // Asignación a Ana
  {
    activo: activo001,
    tipo: "asignacion",
    origen: {
      sede: sedeMontevideo,
      sector: sectorSistemas
    },
    destino: {
      sede: sedeMontevideo,
      sector: sectorSistemas
    },
    empleado: empleadoAna,
    fecha: new Date("2025-01-20"),
    observaciones: "Asignación inicial a empleado"
  },

  // ----------------------------
  // INV-0002
  // ----------------------------
  {
    activo: activo002,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeMontevideo,
      sector: sectorAdministracion
    },
    empleado: null,
    fecha: new Date("2025-02-10"),
    observaciones: "Alta inicial del activo"
  },

  {
    activo: activo002,
    tipo: "asignacion",
    origen: {
      sede: sedeMontevideo,
      sector: sectorAdministracion
    },
    destino: {
      sede: sedeMontevideo,
      sector: sectorAdministracion
    },
    empleado: empleadoBruno,
    fecha: new Date("2025-02-12"),
    observaciones: "Asignación a Administración"
  },

  // ----------------------------
  // INV-0003
  // ----------------------------
  {
    activo: activo003,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeMontevideo,
      sector: sectorRRHH
    },
    empleado: null,
    fecha: new Date("2025-03-05"),
    observaciones: "Alta inicial"
  },

  {
    activo: activo003,
    tipo: "asignacion",
    origen: {
      sede: sedeMontevideo,
      sector: sectorRRHH
    },
    destino: {
      sede: sedeMontevideo,
      sector: sectorRRHH
    },
    empleado: empleadoCarla,
    fecha: new Date("2025-03-07"),
    observaciones: "Asignación a Recursos Humanos"
  },

  // ----------------------------
  // INV-0004
  // ----------------------------
  {
    activo: activo004,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeCanelones,
      sector: sectorContabilidad
    },
    empleado: null,
    fecha: new Date("2025-03-20"),
    observaciones: "Alta inicial"
  },

  {
    activo: activo004,
    tipo: "asignacion",
    origen: {
      sede: sedeCanelones,
      sector: sectorContabilidad
    },
    destino: {
      sede: sedeCanelones,
      sector: sectorContabilidad
    },
    empleado: empleadoDiego,
    fecha: new Date("2025-03-22"),
    observaciones: "Asignación a Contabilidad"
  },

  // ----------------------------
  // INV-0006
  // ----------------------------
  {
    activo: activo006,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    empleado: null,
    fecha: new Date("2025-04-12"),
    observaciones: "Alta inicial"
  },

  {
    activo: activo006,
    tipo: "mantenimiento",
    origen: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    destino: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    empleado: empleadoElena,
    fecha: new Date("2026-02-10"),
    observaciones: "Equipo enviado a mantenimiento preventivo"
  },

  // ----------------------------
  // INV-0008
  // ----------------------------
  {
    activo: activo008,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeMaldonado,
      sector: sectorDireccion
    },
    empleado: null,
    fecha: new Date("2025-05-15"),
    observaciones: "Alta inicial"
  },

  {
    activo: activo008,
    tipo: "asignacion",
    origen: {
      sede: sedeMaldonado,
      sector: sectorDireccion
    },
    destino: {
      sede: sedeMaldonado,
      sector: sectorDireccion
    },
    empleado: empleadoFederico,
    fecha: new Date("2025-05-17"),
    observaciones: "Asignación a Dirección"
  },

  // ----------------------------
  // INV-0009
  // ----------------------------
  {
    activo: activo009,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    empleado: null,
    fecha: new Date("2025-06-01"),
    observaciones: "Alta inicial"
  },

  {
    activo: activo009,
    tipo: "asignacion",
    origen: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    destino: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    empleado: empleadoElena,
    fecha: new Date("2025-06-03"),
    observaciones: "Asignación a Soporte Técnico"
  },

  // ----------------------------
  // INV-0012
  // ----------------------------
  {
    activo: activo012,
    tipo: "alta",
    origen: {},
    destino: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    empleado: null,
    fecha: new Date("2024-08-10"),
    observaciones: "Alta inicial"
  },

  {
    activo: activo012,
    tipo: "baja",
    origen: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    destino: {
      sede: sedeCanelones,
      sector: sectorSoporte
    },
    empleado: empleadoElena,
    fecha: new Date("2026-03-01"),
    observaciones: "Equipo obsoleto dado de baja"
  }
]);


// ============================================================
// 10. ÍNDICES
// ============================================================

db.activos.createIndex(
  { numeroInventario: 1 },
  { unique: true }
);

db.activos.createIndex({
  sede: 1,
  sector: 1
});

db.activos.createIndex({
  estado: 1
});

db.activos.createIndex({
  usuarioAsignado: 1
});

db.movimientos.createIndex({
  activo: 1,
  fecha: -1
});

db.empleados.createIndex({
  sector: 1
});


// ============================================================
// 11. RESUMEN
// ============================================================

print("============================================");
print(" SEED COMPLETADO");
print("============================================");

print("Sedes:       " + db.sedes.countDocuments());
print("Sectores:    " + db.sectores.countDocuments());
print("Empleados:   " + db.empleados.countDocuments());
print("Productos:   " + db.productos.countDocuments());
print("Almacenes:   " + db.almacenes.countDocuments());
print("Activos:     " + db.activos.countDocuments());
print("Movimientos: " + db.movimientos.countDocuments());

print("============================================");