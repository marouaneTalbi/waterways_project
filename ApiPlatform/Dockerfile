# #<<<<<<<<<<Start: PHP-FPM Image Target>>>>>>>>>>#
# FROM php:8.2-fpm-alpine as php

# RUN apk update
# RUN apk add curl

# # Installing and enabling required PHP extension

# # amqp
# RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} && \
#     apk add rabbitmq-c-dev \
#     && pecl install amqp \
#     && docker-php-ext-enable amqp

# # yaml
# RUN apk add --update yaml-dev \
#     && apk add --no-cache --virtual .build-deps g++ make autoconf \
#     && pecl channel-update pecl.php.net \
#     && pecl install yaml && docker-php-ext-enable yaml

# # pgsql
# # pgsql
# RUN apk add libpq-dev && \
#     docker-php-ext-install pdo pdo_pgsql && \
#     docker-php-ext-enable pdo_pgsql

# # zip
# RUN apk add libzip-dev && apk add zip && \
#     docker-php-ext-install zip

# # Installing Composer
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# RUN mkdir /srv/app/

# RUN apk upgrade --update \
#     && apk add -U tzdata \
#     && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
#     && apk del tzdata \
#     && rm -rf \
#     /var/cache/apk/*

# COPY ./.docker/php/conf.d/custom.ini /usr/local/etc/php/conf.d/custom.ini

# WORKDIR /srv/app/

# #USER prod

# COPY ./composer.json ./composer.lock* /srv/app/
# COPY ./symfony.lock /srv/app/

# RUN composer install --no-dev --no-scripts

# COPY . /srv/app/

# RUN APP_ENV=prod composer run auto-scripts

# #<<<<<<<<<<End: PHP-FPM Image Target>>>>>>>>>>#

# #<<<<<<<<<<Start: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#
# FROM php as php_dev

# # xdebug
# RUN apk add --update linux-headers
# RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} && \
#     pecl install xdebug && \
#     docker-php-ext-enable xdebug

# #<<<<<<<<<<End: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#

# #<<<<<<<<<<Start: Server Image Target>>>>>>>>>>#
# FROM httpd:2 as server



# COPY ./.docker/httpd/httpd.conf /usr/local/apache2/conf/httpd.conf


# COPY --from=php /srv/app /srv/app
# #<<<<<<<<<<End: Server Image Target>>>>>>>>>>#



# Utilisez l'image officielle PHP avec la version FPM et Alpine pour un démarrage léger
FROM php:8.1-fpm-alpine as php_base

# [Insérez ici toutes les commandes pour installer PHP et les extensions nécessaires]

# Définissez le répertoire de travail pour l'application
WORKDIR /var/www/html

# Copiez l'application dans le conteneur
COPY . /var/www/html/

# Installez les dépendances de l'application via Composer
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Paramétrez les permissions pour le répertoire de l'application
RUN chown -R www-data:www-data /var/www/html/var

# Utilisez l'image Apache officielle comme base pour le serveur
FROM httpd:latest as server

# Copiez l'application depuis l'étape de construction PHP
COPY --from=php_base /var/www/html /var/www/html

# Exposez le port 80 pour le trafic HTTP
EXPOSE 80

# Lancez Apache en arrière-plan
CMD ["httpd-foreground"]
