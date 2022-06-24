FROM php:7.3-apache

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN install-php-extensions gd mysqli pdo_sqlsrv pdo_odbc wddx 

COPY ./uploads.ini /usr/local/etc/php/conf.d/uploads.ini
COPY ./openssl.cnf /etc/ssl/openssl.cnf

ENV TZ=America/Guatemala