#!/bin/sh
set -e

if [ "$1" = 'php-fpm' ] || [ "$1" = 'php' ] || [ "$1" = 'bin/console' ]; then
	if [ ! -d 'vendor/' ]; then
		composer install --prefer-dist --no-progress --no-interaction
        setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX var
	    setfacl -dR -m u:www-data:rwX -m u:"$(whoami)":rwX var
	fi
fi

exec docker-php-entrypoint "$@"