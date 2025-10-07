# WaraCha 
Waracha (Contracción de "Wara Challenge") es un proyecto desarrollado como desafío para Wara.

## Características

Se compone de un backend y un frontend desarrollados en Node.js con base de datos PostgreSQL

### Backend

Disponibiliza los siguientes recursos a través de una API Rest:
* Auth
  * Login: inicio de sesión de usuarios (devuelve un JWT)
* Users: GET / POST / PUT / DELETE de usuarios del sistema
* Assets: GET / POST / PUT / DELETE de assets
* Owners: GET / POST / PUT / DELETE de owners de assets
* Asset-Types: GET de tipos de assets

### Frontend

Hace uso de los recursos disponibilizados a través de la API:
* Login de usuarios
* CRUD de usuarios
* CRUD de assets
* CRUD de owners

### DB

La base de datos está compuesta por las siguientes tablas:
* users
* owners
* asset_types
* assets

## Instalación

Para ejecutar Waracha localmente, hay que seguir estos pasos:

### Clonar el repositorio:

    git clone https://github.com/Andres-F-Morales/waracha.git
    cd waracha

### Construir y ejecutar con Docker:

El proyecto incluye un archivo docker-compose.yml que facilita la configuración del entorno.

    docker-compose up --build

Esto levantará tanto db como frontend y backend en contenedores Docker.

## Documentación

Se puede acceder a la documentación de la API ingresando a:

https://documenter.getpostman.com/view/13375390/2sB3QJPWD5

## Tecnologías empleadas

* DB: PostgreSQL v15
* Backend: Node.js v22 + Express v4.19
* Frontend: React Admin v5

