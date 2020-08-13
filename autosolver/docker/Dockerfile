# builder stage
FROM composer:1 AS builder
WORKDIR /build
COPY index.php Solver.php composer.json composer.lock ./
RUN rm -rf vendor && \
  composer install -o -n --no-dev --no-cache

# exposing
FROM php:7-apache
WORKDIR /var/www/public
COPY $PWD/docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY $PWD/docker/apache/start-apache /usr/local/bin
COPY $PWD/docker/apache/.htaccess ./
RUN a2enmod rewrite
COPY --from=builder /build ./
RUN chown -R www-data:www-data ./
CMD ["start-apache"]