# Utilisation d'une image Symfony avec Apache
FROM php:apache

# Mettez à jour les packages et installez les dépendances nécessaires
RUN apt-get update \
    && apt-get install -y \
        unzip \
        git \
        libicu-dev \
        libzip-dev \
        libpq-dev

# Installez les extensions PHP nécessaires
RUN docker-php-ext-install \
    intl \
    pdo_mysql \
    pdo \
    pdo_pgsql \
    zip

# Activez le mod_rewrite pour Apache
RUN a2enmod rewrite

# Configurez le point d'entrée de l'application
WORKDIR /var/www/html

# Copiez les fichiers de l'application dans le conteneur
COPY . /var/www/html

# Installez les dépendances de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installez les dépendances du projet
RUN composer install --no-scripts --no-autoloader

# Générez l'autoloader
RUN composer dump-autoload --optimize

# Exposez le port 80 pour Apache
EXPOSE 80

# Point d'entrée de l'application
CMD ["apache2-foreground"]
