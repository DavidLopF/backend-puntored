﻿# backend-prueba desarroladores - punto red
 
 Se desarrollo un backend en node con express, el cual se conecto a los servicios de punto red,guarda los resultados en base de datos y con las restricciones solicitadas para generar una recarga. 


# Datos importantes

1. Para correr el proyecto se deben descargar las dependencias con el comando:
                        
         npm install 
 
2. Se debe agregar archivo .env, en el cual van las credenciales de la base de datos y debe tener la siguiente estructura:

        PORT=5000

        DB_USER=
        DB_PASS=
        DB_HOST=
        DB_PORT=
        DB_DATABASE=
        
3. El script de la base de datos esta en src/db/script.sql, de igual manera adjunto el diagrama de la base de datos
 
     
    <img src="./readme-imgs/Modelo%20Base%20de%20datos.png" width="150" height="150">
