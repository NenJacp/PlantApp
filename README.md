# PlantApp - Front-End

Este es el repositorio del front-end para el proyecto PlantApp, desarrollado con SvelteKit.

## Integrantes

*   Héctor Manuel Cervantes Ambrosio
*   Jorge Abraham Cruz Pech
*   Jesús Augusto Gamboa Sosa
*   Jade Alondra Ávila Collí

## API Alojada en el repositorio 

[API](https://github.com/NenJacp/PlantApp_Back-End.git)
### NOTA: La api no es requerida si solo quiere ver las paginas de errores, usando el boton de ir a debugger, si quiere verlas con respecto a respuestas que devuelva la api puede hacerlo pero requeriras de un .env que tenga los siguentes claves
### Variables de Entorno requeridas:
#### DB_HOST
Dirección del servidor de base de datos PostgreSQL.  
Ejemplo: `localhost` o el nombre del servicio en Docker.

#### DB_PORT
Puerto en el que escucha PostgreSQL.  
Normalmente: `5432`.

#### DB_DATABASE
Nombre de la base de datos que usará PlantApp.

#### DB_USERNAME
Usuario de la base de datos PostgreSQL.

#### DB_PASSWORD
Contraseña del usuario de la base de datos.

---

#### JWT_ISSUER
Identificador del emisor del token JWT.  
Normalmente el nombre de la aplicación (ej. `PlantApp`).

#### JWT_AUDIENCE
Audiencia a la que están destinados los tokens JWT.  
Usualmente el mismo valor que el emisor.

#### JWT_SECRET_KEY
Clave secreta usada para firmar y validar los tokens JWT.

**Debe ser una cadena larga y segura (mínimo 32 caracteres).**  
No debe compartirse ni subirse al repositorio.

---

### Notas importantes

- El archivo `.env` no lo subire por lo cual tu tendras que poner valores, que no necesariamente tienen que ser validas pero son importantes ya que las intentara cargar el Program.cs de la capa Presentation
- Con esto ya puedes usar el boton ir a debugger-api


## Instalación y Ejecución

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### ¿Por qué pnpm?

Para la gestión de dependencias, utilizamos `pnpm` en lugar de `npm` o `yarn`. La razón principal es la seguridad y la eficiencia. `pnpm` utiliza un sistema de almacenamiento direccionable por contenido, lo que significa que los paquetes se guardan en un único lugar en el disco y se enlazan simbólicamente a los proyectos. Esto no solo ahorra una cantidad significativa de espacio en disco, sino que también mejora la velocidad de instalación.

Además, `pnpm` crea una estructura de `node_modules` no plana, lo que evita el problema de las "dependencias fantasma" (poder importar paquetes que no están explícitamente en el `package.json`), llevando a un código más robusto y confiable.

### Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del repositorio:

```bash
pnpm install
```

### Ejecución

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo con el siguiente comando:

```bash
pnpm run dev
```

El servidor estará disponible en la siguiente dirección:

[http://localhost:5173/](http://localhost:5173/)

## Depuración de Errores

La aplicación cuenta con un modo de depuración para visualizar las páginas de error. Para acceder a él:

1.  Ve a la página de inicio de sesión.
2.  En la parte inferior, encontrarás un botón que te llevará a la página de depuración.
3.  Desde allí, podrás navegar a cada una de las páginas de error personalizadas.
