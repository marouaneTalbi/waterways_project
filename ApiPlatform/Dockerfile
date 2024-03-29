# #<<<<<<<<<<Start: PHP-FPM Image Target>>>>>>>>>>#
FROM php:8.2-fpm-alpine as php

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

RUN apk update
RUN apk add curl

# Installing and enabling required PHP extension

# amqp
RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} && \
    apk add rabbitmq-c-dev \
    && pecl install amqp \
    && docker-php-ext-enable amqp

# yaml
RUN apk add --update yaml-dev \
    && apk add --no-cache --virtual .build-deps g++ make autoconf \
    && pecl channel-update pecl.php.net \
    && pecl install yaml && docker-php-ext-enable yaml

# pgsql
# pgsql
RUN apk add libpq-dev && \
    docker-php-ext-install pdo pdo_pgsql && \
    docker-php-ext-enable pdo_pgsql
 
# zip
RUN apk add libzip-dev && apk add zip && \
    docker-php-ext-install zip

# Installing Composer
COPY --from=composer:2.6.6 /usr/bin/composer /usr/bin/composer

RUN mkdir /srv/app/

RUN apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
    && apk del tzdata \
    && rm -rf \
    /var/cache/apk/*

COPY ./.docker/php/conf.d/custom.ini /usr/local/etc/php/conf.d/custom.ini

WORKDIR /srv/app/

#USER prod

COPY ./composer.json ./composer.lock* /srv/app/
COPY ./symfony.lock /srv/app/

RUN composer install --no-dev --no-scripts

COPY . /srv/app/


RUN APP_ENV=prod composer run auto-scripts

#<<<<<<<<<<End: PHP-FPM Image Target>>>>>>>>>>#

#<<<<<<<<<<Start: PHP-FPM Image For the Dev Environment Target>>>>>>>>>># 
FROM php as php_dev

# xdebug
RUN apk add --update linux-headers
RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug


COPY --from=php /srv/app /srv/app


#<<<<<<<<<<End: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#


