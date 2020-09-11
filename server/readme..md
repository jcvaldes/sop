## Librerias necesarias 

### Instalo Sequelize

```
  npm i -S -E  sequelize sequelize-transforms
```

### Instalo Librerias de postgress
```
  npm i -S -E  pg pg-hstore
```

## Configuro babel para interpretar ecmascript 

```
npm i -S -E babel-cli babel-preset-env babel-preset-stage-3 babel-register
```

Se debe crear un archivo .babelrc con la siguiente configuración

```
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }], 
    "stage-3"
  ],
  "sourceMaps": "inline",
  "retainLines": true
}
```

## Instalo dotEnv para trabajar con variables de entorno

Es buena practica poner la información sensible como clientId, secretId, 
Signature del JWT e informacion de configuracion de pasarelas de pago 
en un archivo .env 

Jamás se sube este archivo a un repositorio y se realiza la configuracion en cada entorno en particular 

```
npm i -S -E dotenv
```


## Iniciar proyecto con sequelize

npm i -D -E sequelize-cli

```
sequelize init

npx sequelize-cli init
```

## crear migraciones

```
sequelize migration:generate --name create-users
npx sequelize-cli migration:generate --name create-users
```


## ejecutar migraciones

```
sequelize db:migrate
npx sequelize-cli db:migrate
```

## Ejecutar rollback en migraciones


Elimino todo

```
node_modules/.bin/sequelize db:migrate:undo:all
sequelize db:migrate:undo:all
npx sequelize-cli db:migrate:undo:all

```

Elimina la ultima migracion realizada

```
node_modules/.bin/sequelize db:migrate:undo
```

## Instalo bcryptjs 

```
npm i -S -E bcryptjs
```


## crear seeder

```
npx sequelize-cli seed:generate --name user
```

## Ejecutar o deshacer un solo seed en especial

```
npx sequelize-cli db:seed --seed name-of-seed-as-in-data
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
```

## Ejecutar todos los seeders

```
npx sequelize-cli db:seed:all
```

## Deshacer todos los seed ejecutados

```
npx sequelize-cli db:seed:undo:all
```

## Crear modelos

```
  npx sequelize-cli model:generate --name Product --attributes product_name:string,product_price:string,product_photo:string
  node_modules/.bin/sequelize model:create --name User --attributes 'firstname:string lastname:string'
```

## Instalar dependencia de JWT para manejo de token

```
npm i -E jsonwebtoken
```

## Fuentes

documentacion de sequelize ver mas acerca de lo que se puede hacer con las migraciones
https://sequelize.org/master/manual/migrations.html

## Crear docker

docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=secretpass -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci MYSQL_DATABASE='delilahresto_development'

docker exec -ti mysql1 bash 

mysql -uroot -psecretpass

CREATE DATABASE delilahresto_development;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'secretpass';

CREATE USER 'delilahresto'@'localhost' IDENTIFIED BY 'secretpass';
GRANT ALL PRIVILEGES ON *.* TO 'delilahresto'@'localhost';


## Heroku

Pasos para deployar API rest

VER -> https://www.youtube.com/watch?v=dw1y7qwNb4E

```
1. Instalar el toolkit heroku
   https://devcenter.heroku.com/articles/heroku-cli

2. $ heroku login

3. Crear una app 
   $ heroku create

4. Renombrar
   $ heroku apps:rename --app [nombreviejo] [nombrenuevo] 

5. git remote -v
   ver si esta el repo de heroku

6. git push heroku master
7. heroku logs --tail 
8. abrir otra terminal y ejecutar el addon
   heroku addons:create cleardb:ignite

   heroku addons:create heroku-postgresql o heroku addons:add heroku-postgresql 

   Si no tengo tarjeta de credito hay que configurarla
   no se va a cobrar nada

      Creating cleardb:ignite on ⬢ delilahresto... !
      ▸    Please verify your account to install this add-on plan (please enter a credit card) For more
      ▸    information, see https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify

9. heroku config | grep CLEARDB_DATABASE_URL  #en mysql
9. heroku config | grep DATABASE_URL  #en postgres

10. heroku config:set DATABASE_URL='cadena_de_conexion_mysql_devuelta' 

11. configurar la cadena de conexion mysql devuelta en el config de la aplicacion

12. Si uso postgres, configurar la cadena de conexion postgres devuelta en el config de la aplicacion

13. git add .
14. git commit -m "heroku config"
15. git push origin master
16. git push heroku master

17. heroku run bash sirve para acceder a mi virtual de heroku donde esta alojado mi aplicacion a traves del 
shell bash y se puede aplicar comandos de linux para ejecutar los seeders
     npx sequelize-cli db:seed:all

17. heroku open

18. para resetear el dynamo 
   $ heroku restart

```