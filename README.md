# Proyecto Vue.js con Node.js, Express, TypeScript y MongoDB Atlas

Este proyecto es una aplicación web que permite gestionar doctores y sus datos utilizando una arquitectura full-stack. El frontend está desarrollado con Vue.js, mientras que el backend está construido con Node.js, Express y TypeScript. MongoDB Atlas se utiliza como base de datos.

## Funcionalidades

- **Frontend**:
  - Interfaz de usuario para gestionar doctores.
  - Formulario para añadir y editar información de doctores.
  - Lista de doctores con opciones para ver, editar y eliminar.

- **Backend**:
  - API RESTful para manejar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de los doctores.
  - Validación de datos y manejo de errores.
  - Conexión segura a MongoDB Atlas.

## Requisitos previos

Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

- Node.js (v14 o superior)
- npm (v6 o superior)
- MongoDB Atlas (configurado y con una conexión disponible)

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Clonar el repositorio
```
git clone https://github.com/tu_usuario/tu_proyecto.git
cd tu_proyecto
```
### Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto y añade tus credenciales de MongoDB Atlas:
```
MONGODB_URI=tu_mongodb_uri
PORT=3000
```
## Backend
1. Navega al directorio del backend:
```
cd backend
```
2. Instala las dependencias:
```
npm install
```
3. Compila el proyecto TypeScript:
```
npm run build
```
4. Inicia el servidor:
```
npm start
```
## Frontend
1. Navega al directorio del frontend:
```
cd frontend
```
2. Instala las dependencias:
```
npm install
```
3. Inicia la aplicación Vue.js:
```
npm run serve
```
## API del Backend
### Endpoints
Obtener todos los doctores
* URL: /api/doctors
* Método: GET
* Descripción: Obtiene una lista de todos los doctores.
Obtener un doctor por ID
* URL: /api/doctors/:id
* Método: GET
* Descripción: Obtiene los detalles de un doctor específico por ID.
Crear un nuevo doctor
* URL: /api/doctors
* Método: POST
* Descripción: Crea un nuevo doctor.
* Cuerpo de la solicitud:
```
{
  "nombre": "string",
  "especialidad": "string",
  "email": "string"
}
```
Actualizar un doctor
* URL: /api/doctors/:id
* Método: PUT
* Descripción: Actualiza la información de un doctor existente por ID.
* Cuerpo de la solicitud:
```
{
  "nombre": "string",
  "especialidad": "string",
  "email": "string"
}
```
Eliminar un doctor
* URL: /api/doctors/:id
* Método: DELETE
* Descripción: Elimina un doctor por ID.

## Scripts de npm
### Backend
* npm run build: Compila el código TypeScript.
* npm start: Inicia el servidor compilado.
### Frontend
* npm run serve: Inicia la aplicación Vue.js en modo desarrollo.
* npm run build: Compila la aplicación para producción.
## Tecnologías Utilizadas
* Vue.js - Framework de JavaScript para construir interfaces de usuario.
* Node.js - Entorno de ejecución para JavaScript en el servidor.
* Express - Framework web para Node.js.
* TypeScript - Superset tipado de JavaScript.
* MongoDB Atlas - Base de datos NoSQL en la nube.
