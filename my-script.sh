#!/bin/bash

# $1 ruta del proyecto ejp. /e/Documentos/desarrollo/oca
# $2 es el nombre del proyecto tamto en carpeta como en title index html eje. oca

# VARIABLES
DIR="$1/$2"
LOCATION=`pwd`

# DIRECTORIO DEL PROYECTO
mkdir $DIR
cd $DIR

# ESTRUCTURA DE CARPETAS
mkdir .vscode db api api/class api/cron-job api/libs api/models api/public api/v1 doc doc/images doc/design doc/requests

# CONFIGURACION DE EDITOR
cp $LOCATION/sources/.vscode/* $DIR/.vscode/

# CONFIGURACION DE API PHP
cp -R $LOCATION/sources/api/* $DIR/api/
cp $LOCATION/sources/api/.env.example $DIR/api/

#ARCHIVOS DE CONFIGURACION DE DOCKER
cp -R $LOCATION/sources/docker/* $DIR/
cp $LOCATION/sources/docker/.env.example $DIR/

# CONFIGURACION WEB REACT
npm create vite@latest web -- --template react

# UBICACION WEB 
cd web && mkdir public

# MUEVE ELEMENTOS PUBLICOS
mv src/favicon.svg public/favicon.svg && mv src/logo.svg public/logo.svg

# ELIMINA CONTENIDO DE LA CARPETA SRC
rm -rf src/*

# COPIA DE ARCHIVOS BASICOS AL SRC
cp -R $LOCATION/sources/web/src/* $DIR/web/src

# CREACION DE DIRECTORIOS
mkdir src/adapters src/assests src/components src/hooks src/interceptors src/pages src/partials src/redux src/services src/utilities  src/styled-components

# QUITAR CARED DE package.json
sed -i 's/"^/"/g' package.json

# INSTALACION DE DEPENDENCIAS BASICAS
npm i && npm i -E @reduxjs/toolkit axios crypto-js moment react-icons react-redux react-router-dom styled-system styled-components && npm i -E -D eslint eslint-config-prettier prettier

# CONFIGURACION DE ESLINT 
npx eslint --init

# COPIA DE ARCHIVOS RAIZ
cp -R $LOCATION/sources/web/config/* $DIR/web/
cp $LOCATION/sources/web/config/.eslintignore $DIR/web/
cp $LOCATION/sources/web/config/.eslintrc.json $DIR/web/
cp $LOCATION/sources/web/config/.gitignore $DIR/web/
cp $LOCATION/sources/web/config/.prettierignore $DIR/web/
cp $LOCATION/sources/web/config/.prettierrc $DIR/web/

# COLOCAMOS EL NOMBRE DEL PROYECTO AL index.html
sed -i "s/PROJECT/${2^^}/g" index.html

# LINTER
npx eslint --fix . --ext .js,.jsx
# FORMART
npx prettier -w .

# INIT REPO
cd ..
git init

# OPEN VSCODE 
code .