# 📦 Inventario

API REST desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar un sistema de inventario.

## 🚀 Tecnologías utilizadas

* **Node.js** — Entorno de ejecución.

* **Express 5** — Framework para crear el servidor y las rutas HTTP.

* **MongoDB** — Base de datos NoSQL.

* **Mongoose** — ODM para trabajar con MongoDB desde Node.js.

* **Morgan** — Middleware para registrar las solicitudes HTTP.

* **Dotenv** — Gestión de variables de entorno.

* **Nodemon** — Reinicio automático del servidor durante el desarrollo.

## 📁 Estructura del proyecto

```text
inventario/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── activo.controller.js
│   │   ├── almacen.controller.js
│   │   ├── empleado.controller.js
│   │   ├── movimiento.controller.js
│   │   ├── producto.controller.js
│   │   ├── reporte.controller.js
│   │   ├── sector.controller.js
│   │   └── sede.controller.js
│   │
│   ├── Models/
│   │   ├── enums/
│   │   │   └── productTypes.enum.js
│   │   │
│   │   ├── activo.model.js
│   │   ├── almacen.model.js
│   │   ├── empleado.model.js
│   │   ├── movimiento.model.js
│   │   ├── producto.model.js
│   │   ├── sector.model.js
│   │   └── sede.model.js
│   │
│   ├── routes/
│   │   ├── activo.routes.js
│   │   ├── almacen.routes.js
│   │   ├── empleado.routes.js
│   │   ├── movimiento.routes.js
│   │   ├── producto.routes.js
│   │   ├── reporte.routes.js
│   │   ├── sector.routes.js
│   │   └── sede.routes.js
│   │
│   ├── service/
│   │   ├── activo.service.js
│   │   ├── almacen.service.js
│   │   ├── empleado.service.js
│   │   ├── movimiento.service.js
│   │   ├── producto.service.js
│   │   ├── reporte.service.js
│   │   ├── sector.service.js
│   │   └── sede.service.js
│   │
│   ├── util/
│   │   └── seed.js
│   │
│   ├── app.js
│   └── db.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> La estructura puede cambiar a medida que se incorporen nuevas funcionalidades, rutas, controladores y modelos.

## ⚙️ Requisitos

Antes de ejecutar el proyecto necesitas tener instalado:

* [Node.js](https://nodejs.org/)

* [MongoDB](https://www.mongodb.com/)

Puedes comprobar la instalación de Node.js ejecutando:

```bash
node --version
```

Y npm con:

```bash
npm --version
```

También puedes comprobar que MongoDB esté disponible ejecutando:

```bash
mongosh --version
```

## 📥 Instalación

Clona el repositorio:

```bash
git clone https://github.com/nnobleDev/bd-noSql
```

Accede al directorio del proyecto:

```bash
cd inventario
```

Instala las dependencias:

```bash
npm install
```

## 🔐 Variables de entorno

El proyecto utiliza variables de entorno para configurar el servidor y la conexión con MongoDB.

Crea un archivo `.env` en la raíz del proyecto:

```env
SERVER_PORT=3000
MONGO_PORT=27017
DB_MONGO="inventario"
```

### Variables disponibles

| Variable      | Descripción                         | Valor de ejemplo |
| ------------- | ----------------------------------- | ---------------- |
| `SERVER_PORT` | Puerto donde se ejecuta el servidor | `3000`           |
| `MONGO_PORT`  | Puerto utilizado por MongoDB        | `27017`          |
| `DB_MONGO`    | Nombre de la base de datos          | `inventario`     |

> **Importante:** no subas el archivo `.env` a GitHub. Inclúyelo en `.gitignore` para evitar publicar información sensible.

## 🗄️ MongoDB

La aplicación utiliza MongoDB como sistema de base de datos y Mongoose como ODM.

La configuración utiliza:

```env
MONGO_PORT=27017
DB_MONGO="inventario"
```

Por lo tanto, la aplicación espera encontrar MongoDB ejecutándose localmente en el puerto `27017`.

La base de datos utilizada por el proyecto se llama:

```text
inventario
```

Las principales colecciones utilizadas son:

```text
inventario

├── activos
├── productos
├── sedes
├── sectores
├── almacenes
├── empleados
└── movimientos
```

## 🌱 Cargar datos de prueba (Seed)

El proyecto incluye un archivo `src/util/seed.js` con datos precargados para facilitar las pruebas y el desarrollo de la aplicación.

El seed crea información de ejemplo para:

* Sedes.

* Sectores.

* Empleados.

* Productos.

* Almacenes.

* Activos.

* Movimientos e historial de activos.

Además, incluye diferentes estados de activos (`disponible`, `asignado`, `mantenimiento` y `baja`) para permitir probar diferentes casos de uso.

### Requisitos

Antes de ejecutar el seed, asegúrate de que MongoDB esté ejecutándose localmente en el puerto `27017`.

Puedes comprobar la conexión ejecutando:

```bash
mongosh
```

### Importar el seed

El proyecto incluye un script en `package.json` para ejecutar el seed de forma sencilla.

Desde la carpeta raíz del proyecto ejecuta:

```bash
npm run seed
```

Este comando ejecuta internamente:

```bash
mongosh "mongodb://localhost:27017" src/util/seed.js
```

El archivo `src/util/seed.js` selecciona automáticamente la base de datos:

```javascript
use("inventario");
```

Por lo tanto, los datos serán cargados en la base de datos `inventario`.

Al finalizar correctamente, se mostrará un resumen similar a:

```text
============================================
 SEED COMPLETADO
============================================

Sedes:        3
Sectores:     6
Empleados:    6
Productos:    8
Almacenes:    3
Activos:      12
Movimientos:  15

============================================
```

### ⚠️ Importante

El `seed.js` elimina los datos existentes de las colecciones antes de insertar los datos de prueba.

Por ejemplo:

```javascript
db.activos.deleteMany({});
```

Por este motivo, **no se debe ejecutar el seed sobre una base de datos que contenga información que se quiera conservar**.

El seed está pensado para utilizarse durante el desarrollo y las pruebas.

## ▶️ Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El proyecto utiliza **Nodemon**, por lo que el servidor se reiniciará automáticamente cuando detecte cambios en los archivos.

Si `SERVER_PORT` está configurado como `3000`, el servidor estará disponible en:

```text
http://localhost:3000
```

## 📡 Morgan

El proyecto utiliza Morgan para registrar las solicitudes HTTP realizadas al servidor.

Por ejemplo, al realizar una petición:

```text
GET / 200 5.123 ms - 123
```

Esto permite visualizar las solicitudes y respuestas mientras se desarrolla la aplicación.

## 📜 Scripts disponibles

Los scripts definidos en `package.json` son:

### Desarrollo

```bash
npm run dev
```

Inicia la aplicación utilizando Nodemon.

### Seed

```bash
npm run seed
```

Carga los datos de prueba definidos en `src/util/seed.js`.

Este script ejecuta:

```bash
mongosh "mongodb://localhost:27017" src/util/seed.js
```

> **Importante:** el seed elimina los datos existentes antes de insertar los datos de prueba.

### Tests

```bash
npm test
```

Actualmente no hay tests implementados en el proyecto.

## 🔄 Flujo de ejecución

Luego de clonar el repositorio, instalar las dependencias y configurar MongoDB, el flujo recomendado para iniciar el proyecto es:

```bash
npm install
npm run seed
npm run dev
```

De esta forma:

1. Se instalan las dependencias.
2. Se cargan los datos de prueba en MongoDB.
3. Se inicia el servidor en modo desarrollo.

## 🛠️ Estado del proyecto

🚧 **En desarrollo**

El proyecto se encuentra en desarrollo y se irán incorporando nuevas funcionalidades relacionadas con la gestión del inventario.

## 📄 Licencia

Este proyecto utiliza la licencia **ISC**.
