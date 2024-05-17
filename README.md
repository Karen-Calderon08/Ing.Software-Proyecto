# SongStock

## Cómo trabajaremos

Para mantener una organización y evitar conflictos entre los archivos, cada miembro del equipo deberá crear una rama con su nombre y trabajar desde allí. Los pasos son:

1. Asegúrate de estar en la rama main:

```
git checkout main
```

2. Crea una nueva rama con tu nombre:

```
git checkout -b [su-nombre]
```

Recuerde que la rama main estará bloqueada y cualquier cambio que quieras fusionar en ella deberá hacerse a través de un Pull Request (PR). Esto nos permite revisar y discutir los cambios antes de integrarlos en la rama principal.

Una vez que el PR esté abierto, se reivsaran los cambios revisarlo y comentarlo. Cuando todos estén de acuerdo con los cambios, el PR puede ser fusionado en la rama main.

## Backend

El servidor backend de nuestro proyecto. Utiliza Express.js como framework y Prisma como ORM para interactuar con la base de datos.

### Cómo hacerlo funcionar

1. Instala las dependencias necesarias con npm.

```sh
npm install
```

2. Navega a la carpeta `backend` en tu terminal.

```sh
cd backend
```

<!-- 3.() Copia el archivo `.env.example` a un nuevo archivo llamado `.env` y rellena las variables de entorno necesarias.

`cp .env.example .env` -->

4. Inicia el servidor en modo de desarrollo con el siguiente comando:

```sh
npm run dev
```

### Qué hace

El servidor backend proporciona una API REST para interactuar con la base de datos. Actualmente, tiene una ruta definida para obtener canciones desde la base de datos.

### Cómo funciona

El servidor utiliza Express.js para manejar las solicitudes HTTP. Prisma se utiliza para interactuar con la base de datos. Por ahora solo hay una ruta que esta definida en el archivo `src/rutas/cancion.js`, la idea es que cada uno cree los endpoints que necesite para la creacion de sus funcionalidades.

### Scripts del package.json

- `dev`: Inicia el servidor en modo de desarrollo utilizando nodemon, lo que permite la recarga en caliente del servidor cuando se realizan cambios en los archivos.
- `start`: Inicia el servidor en modo de producción.
- `test`: Ejecuta las pruebas unitarias del proyecto utilizando Jest.

```sh
"scripts": {
  "dev": "nodemon ./src/index.js",
  "start": "node ./src/index.js",
  "test": "node --experimental-vm-modules ../node_modules/jest/bin/jest.js"
  }
```

## Ejecución de pruebas

Para ejecutar las pruebas en este proyecto, sigue estos pasos:

1. Asegúrate de tener instalado Node.js y npm en tu sistema. Puedes descargarlos desde [aquí](https://nodejs.org/).

2. Instala las dependencias del proyecto con el siguiente comando, en caso de no tenerlas :
```sh
npm install
```

3. Navega hasta el directorio del proyecto en tu terminal, a la carpeta /backend.


4.Ejecuta las pruebas con el siguiente comando:

```sh
npm run test
```

Este comando ejecutará todas las pruebas definidas en los archivos de prueba en el directorio backend/src/tests/, (por ahora metan los test dentro de backend/src/tests/test.js).

## Creación de un Pull Request (PR)

Sigue estos pasos para crear un PR:

1. **Crear una nueva rama:** En tu terminal, navega hasta el directorio del proyecto y crea una nueva rama con el comando 

```sh
git checkout -b nombre_de_tu_rama
```

 Asegúrate de reemplazar `nombre_de_tu_rama` con su nombre.

2. **Realizar cambios:** Realiza los cambios necesarios en tu código. Una vez que hayas terminado, puedes verificar los cambios con el comando 

```sh
git status
```


3. **Agregar y confirmar cambios:** Agrega los cambios a la etapa de Git con el comando `git add .`. Luego, confirma los cambios con el comando `git commit -m "tu mensaje de commit"`. Asegúrate de reemplazar `tu mensaje de commit` con un mensaje descriptivo de los cambios que has realizado.

4. **Subir la rama al repositorio remoto:** Sube tu rama al repositorio remoto con el comando 

```sh
git push origin nombre_de_tu_rama
```

5. **Crear un PR en GitHub:**
    - Ve a la página principal de tu repositorio en GitHub.
    - Haz clic en el botón 'New pull request'.
    - En la página 'Compare changes', selecciona tu rama en el menú desplegable 'compare'.
    - Revisa tus cambios y asegúrate de que son los que quieres incluir en el PR.
    - Cuando estés listo, haz clic en el botón 'Create pull request'.
    - Escribe un título y una descripción para tu PR. Cuando hayas terminado, haz clic en 'Create pull request'.

¡Eso es todo! Ahora has creado un PR.

## Actualización del Repositorio Local

Para mantener tu repositorio local actualizado con el repositorio remoto, sigue estos pasos:

1. **Cambiar a la rama que quieres actualizar:** Usa el comando `git checkout nombre_de_la_rama` para cambiar a la rama que quieres actualizar, ejemplo `git checkout andres`.

2. **Obtener los cambios del repositorio remoto:** Usa el comando `git pull origin main` para obtener los cambios más recientes del repositorio remoto estando en la rama main local. Esto no afectará a tus archivos locales.


Aquí están los comandos:

```sh
git checkout nombre_de_la_rama
git pull origin main
```

Asegúrate de no tener cambios que no hayan hecho commit porque puede incurrir en errores al momento de hacer la combinación de ramas (merge).


## Frontend

El frontend de nuestro proyecto está construido con Vite. Aquí te explicamos cómo puedes ponerlo en marcha.

### Cómo hacerlo funcionar

1. Asegúrate de tener instalado Node.js y npm en tu sistema. Puedes descargarlos desde [aquí](https://nodejs.org/).

2. Instala las dependencias necesarias con npm. Navega hasta el directorio del proyecto en tu terminal, a la carpeta /frontend.

```sh
cd frontend
npm install
```

3.Inicia el servidor de desarrollo con el siguiente comando
```sh
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite. Por defecto, puedes acceder a la aplicación en tu navegador en http://localhost:5173/.