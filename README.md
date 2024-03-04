# Pokeapi Frontend

Desarrollo de prueba técnica utilizando la [PokeAPI](https://pokeapi.co/) donde se implemento el registro de un nuevo perfil, elegir el equipo pokemon, pantalla de entrenador, editar equipo y editar información de perfil.

Como libreria de componentes UI se utilizo [Angular Material](https://material.angular.io/) se crearon componentes para personalizar los estilos de cada uno de los componentes que se utilizaron en las pantallas.

Como gestor de estado global se utilizo [NGRX](https://ngrx.io/) para los datos del usuario, los pokemons seleccionados y una bandera para saber si completo la creación del perfil.

## Demo

[click](https://pokeapi-frontend-indol.vercel.app)

## Instalación

1. Clonar el repositorio

```sh
git clone https://github.com/DenisValladares19/pokeapi-frontend-angular.git
```

2. Instalar dependencias

```sh
npm install
```

3. Ejecutar el proyecto

```sh
npm start
```

## Despliegue con Docker

Se configuro el archivo `.Dockerfile` para que al generar la imagen se compile la aplicación de angular y se configura un servidor [NGINX](https://www.nginx.com/) para que sirva los archivos estáticos generados después de compilar.

Se configuro también el archivo `.dockerignore` para omitir las carpetas `node_modules, dist, .angular, .git` cuando se copian todos los archivos del proyecto a la imagen de docker que se esta generando

### Generar imagen docker en local

```sh
docker build . -f .Dockerfile -t pokeapi-frontend:latest
```

### Ejecutar la imagen docker en local

```
docker run -d -p 127.0.0.1:80:80 pokeapi-frontend:latest
```
