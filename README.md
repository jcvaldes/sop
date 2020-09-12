# Arquitectura base

Tecnologías Angular 10, Bootstrap 4, CSS 3, Nodejs, Express, Sequelize

## Para correr en local seguir los siguientes pasos: 

1- Crear base de datos y configurar en el archivo config.json

2- Ejecutar comando: 
```
npm install
```
3- Migrar la base de datos
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Carpetas: 

core: esta todo el nucleo de la aplicación y es todo lo que es compartido en toda la aplicación e indispensable para que funcione como guards, interceptors y servicios, etc

shared: es todo lo que se comparte pero puede usarse en 1, 2 o mas componentes pero no en toda la aplicación

modules: aqui se encuentran los módulos y se trabajan con lazy load
