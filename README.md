### 🚀 IMS: Tool Manager (Backend & Frontend Monorepo)
Este proyecto es una prueba técnica implementada como un monorepo que contiene una API RESTful con NestJS, una base de datos con PostgreSQL desplegada en SupaBase y un cliente web con Angular/Material. La persistencia de datos se gestiona a través de tu instancia de PostgreSQL alojada en Supabase.

### Tecnologías usadas
+ NestJS 
+ PostgreSQL
+ typeORM
+ Supabase
+ Angular v14.2.0
+ Angular Material

#### ⚙️ Requisitos Previos
Asegúrate de tener instalado el siguiente software en tu entorno local:

Node.js (v16.x o superior)

npm (incluido con Node.js)

Angular CLI (npm install -g @angular/cli 14.2.0)

1. Crear Archivo .env
Crea un archivo llamado .env dentro de la carpeta del backend (root del backend): tool-manager-api/.env.

Copiar y pegar la siguiente configuración

# Credencial base de datos en supabase
```DB_PASSWORD=SECRESTDBpass123```

# JWT_SECRET y EXPIRATION
```JWT_SECRET=miclaveSecreta```

```JWT_EXPIRES_IN=1h```

# 🛠️ Puesta en Marcha Local
El proyecto requiere dos procesos separados para el backend y el frontend. Abre dos terminales en la raíz del proyecto (IMS/).

## 1. Iniciar el Backend (NestJS)
El backend se ejecuta en el directorio tool-manager-api/.

### Terminal 1:

Instalar dependencias:

Bash

```
cd tool-manager-api
npm install
```
Ejecutar el servidor:

Bash
```
npm run start:dev
```

El servidor se iniciará en http://localhost:3000.

## 2. Iniciar el Frontend (Angular)
El cliente web se ejecuta en el directorio 

```
frontend/.
```

#### Terminal 2:

Instalar dependencias:

Bash
```
cd frontend
npm install
```
Ejecutar el cliente web:

Bash
```
npm run start
```
El frontend se iniciará en http://localhost:4200 y se conectará automáticamente al backend local.

📝 Uso y Roles
Accede a la aplicación en http://localhost:4200.

## Usuarios precargados

#### admin

| cédula | contraseña | rol |
| :------------- |:-------------:| :-----:|
| 9999 | pass | usuario |
| 1044 | pass | admin |
| 1234 | pass | usuario |
| 34678 | pass | usuario |
| 55367 | pass | usuario |
| 45678 | pass | admin |
| 1111 | pass | admin |
| 7788766 | pass | usuario |

#### Regístrate para crear tu primer usuario.

Roles:

+ Usuario Normal: Solo puede ver sus propios préstamos y utilizar la acción "Entregar".

+ Administrador (esAdmin: true): Puede ver todos los préstamos y utilizar la acción "Finalizar Préstamo" sobre cualquier registro.

## Nota importante (Scope del proyecto)
Esta es la solución mímima viable. Podrían normalizarse las tablas a la tercera forma normal (3N) y añadirse la tabla herramientas, y unión herramientas-prestamo para poder tener un proyecto escalable y funcional.

 Tambien podía añadirse el feature de registro de nuevos usuarios
