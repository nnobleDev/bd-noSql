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
├── src/
│   ├── app.js
│   └── db.js
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

## 🗄️ MongoDB

La aplicación utiliza MongoDB como sistema de base de datos y Mongoose como ODM.

La configuración utiliza:

```env
MONGO_PORT=27017
DB_MONGO="inventario"
```

Por lo tanto, la aplicación espera encontrar MongoDB ejecutándose localmente en el puerto `27017`.

## 📜 Scripts disponibles

Los scripts definidos en `package.json` son:

### Desarrollo

```bash
npm run dev
```

Inicia la aplicación utilizando Nodemon.

### Tests

```bash
npm test
```

Actualmente no hay tests implementados en el proyecto.

## 🛠️ Estado del proyecto

🚧 **En desarrollo**

El proyecto se encuentra en desarrollo y se irán incorporando nuevas funcionalidades relacionadas con la gestión del inventario.

## 📄 Licencia

Este proyecto utiliza la licencia **ISC**.
