Buenas !! A continuación un instructivo de como inicializar el proyecto.

## Prerrequisitos
- Docker compose
- Node version v20.17.0
- Yarn
- Tener los puertos 5440, 7001 y 7002 sin utilizar.

## Backend
1. Ingrese a la carpeta del backend: `cd backend/`
2. Cree la instancia de la base de datos: `docker compose up -d` o `docker-compose up -d` (El guión puede ser necesario dependiendo de la forma en que instaló docker).
    - Esto inicializará una base de datos de postgres vacía.
3. Si tiene nvm instalado puede seleccionar la versión de node requerida: `nvm use`
4. Si no tiene yarn instalado: `npm i -g yarn`
5. Instale las dependencias del backend: `yarn install` (Por favor use yarn)
6. Inicialice el proyecto: `yarn start:dev` o `yarn start`
    - Esto inicializará el servidor en el puerto 7001 y comenzará el proceso de recolección de datos de las apis de pokemon y rick and morty, el proceso puede tardar entre 5 y 10 minutos y solo
      se ejecutará la primera vez que incie el servidor, por favor, tengan paciencia, no interrumpan el proceso y espere a que termine para poder comenzar a usar el servidor.

### Resultados

- Base de datos: Tendrá una base de datos de postgres en el puerto 5440, si desea conectarse por fuera a la instancia puede visualizar las credenciales en el archivo .env:
  
  ![image](https://github.com/user-attachments/assets/9db45c4d-f097-453f-87af-b6aa6d76b316)

- Swagger: El servidor levantará automaticamente un swagger en http://localhost:7001/docs en donde podrá visualizar los endpoints disponibles:
  ![image](https://github.com/user-attachments/assets/2ef26f1c-8b8c-43a1-8330-c5faa4709466)


## Frontend
1. Ingrese a la carpeta del frontend: `cd frontend/`
2. Si tiene nvm instalado puede seleccionar la versión de node requerida: `nvm use`
3. Si no tiene yarn instalado: `npm i -g yarn`
4. Instale las dependencias del backend: `yarn install` (Por favor use yarn)
5. Inicialice el proyecto: `yarn dev`
    - Esto levantará el frontend en el puerto 7002 
    ![image](https://github.com/user-attachments/assets/057f6f64-bb8f-41ce-b8d1-582100f8d55e)




