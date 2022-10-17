#!/bin/bash

# $1 ruta del proyecto ejp. /e/Documentos/desarrollo/oca
# $2 es el nombre del proyecto tanto en carpeta como en title index html eje. oca

# VARIABLES
DIR="$1/$2"
LOCATION=`pwd`

# DIRECTORIO DEL PROYECTO
cd $1

# CONFIGURACION WEB REACT
npm create vite@latest $2 -- --template react

# UBICACION 
cd $2 && mkdir public

# MUEVE ELEMENTOS PUBLICOS
mv -r src/*.svg public/

# ELIMINA CONTENIDO DE LA CARPETA SRC
rm -rf src/*

# CREACION DE DIRECTORIOS
mkdir src/adapters src/assests src/components src/context src/guards src/hooks src/interceptors  src/models src/pages src/redux src/services src/styled-components src/utilities 

# COPIA DE ARCHIVOS BASICOS AL SRC
cp -R $LOCATION/sources/web/src/* $DIR/src/

# QUITAR CARED DE package.json
sed -i 's/"^/"/g' package.json

# INSTALACION DE DEPENDENCIAS BASICAS
npm i && npm i -E @reduxjs/toolkit axios crypto-js moment react-icons react-redux react-router-dom styled-system styled-components antd && npm i -E -D eslint eslint-config-prettier prettier less

# CONFIGURACION DE ESLINT 
npx eslint --init

# COPIA DE ARCHIVOS RAIZ
cp -R $LOCATION/sources/web/config/* $DIR/ && cp -R $LOCATION/sources/web/config/.* $DIR/

# COLOCAMOS EL NOMBRE DEL PROYECTO AL index.html Y agregamos version, informacion del autor y comandos de eslint y prettier
sed -i "s/PROJECT/${2^^}/g" index.html 
sleep 3
sed -i '5 a \\t \"author\": { \n \t \t \"name\": \"Alex Ortega\", \n \t \t \"email\": \"mortegalex27@outlook.es\" \n \t },' package.json 
sleep 1
sed -i '13 a , \t \t \"format\": \"prettier -w .\", \n \t \t \"lint\": \"eslint --fix . --ext .js,.jsx\"' package.json && sed -i 's/"0.0.0/"1.0.0/g' package.json

# LINTER
npx eslint --fix . --ext .js,.jsx
# FORMART
npx prettier -w .

# OPEN VSCODE 
code .