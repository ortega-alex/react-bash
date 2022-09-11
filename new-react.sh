# $1 ruta del proyecto ejp. /e/Documentos/desarrollo/oca
# $2 es el nombre del proyecto tanto en carpeta como en title index html eje. oca

# VARIABLES
DIR="$1/$2"
LOCATION=`pwd`

# DIRECTORIO DEL PROYECTO
cd $1

# CONFIGURACION WEB REACT
npm create vite@latest $2 -- --template react

# UBICACION WEB 
cd $2 && mkdir public

# MUEVE ELEMENTOS PUBLICOS
mv src/favicon.svg public/favicon.svg && mv src/logo.svg public/logo.svg

# ELIMINA CONTENIDO DE LA CARPETA SRC
rm -rf src/*

# COPIA DE ARCHIVOS BASICOS AL SRC
cp -R $LOCATION/sources/web/src/* $DIR/src

# CREACION DE DIRECTORIOS
mkdir src/adapters src/assests src/components src/hooks src/interceptors src/pages src/partials src/redux src/services src/utilities  src/styled-components src/guards src/models

# QUITAR CARED DE package.json
sed -i 's/"^/"/g' package.json

# INSTALACION DE DEPENDENCIAS BASICAS
npm i && npm i -E @reduxjs/toolkit axios crypto-js moment react-icons react-redux react-router-dom styled-system styled-components && npm i -E -D eslint eslint-config-prettier prettier

# CONFIGURACION DE ESLINT 
npx eslint --init

# COPIA DE ARCHIVOS RAIZ
cp -R $LOCATION/sources/web/config/* $DIR/
cp $LOCATION/sources/web/config/.eslintignore $DIR/
cp $LOCATION/sources/web/config/.eslintrc.json $DIR/
cp $LOCATION/sources/web/config/.gitignore $DIR/
cp $LOCATION/sources/web/config/.prettierignore $DIR/
cp $LOCATION/sources/web/config/.prettierrc $DIR/

# COLOCAMOS EL NOMBRE DEL PROYECTO AL index.html
sed -i "s/PROJECT/${2^^}/g" index.html

# LINTER
npx eslint --fix . --ext .js,.jsx
# FORMART
npx prettier -w .