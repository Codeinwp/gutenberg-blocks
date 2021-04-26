FROM hardeepasrani/pirate-brewery

RUN git clone --depth 1 https://github.com/Codeinwp/otter-blocks.git /var/www/html/wp-content/plugins/otter-blocks && \
    composer install --prefer-dist --no-progress --working-dir=/var/www/html/wp-content/plugins/otter-blocks

# WORKDIR /var/www/html/wp-content/plugins/vendor/codeinwp/
# RUN rm -rf gutenberg-blocks && mkdir gutenberg-blocks

# WORKDIR /var/www/html/wp-content/plugins/vendor/codeinwp/gutenberg-blocks
# COPY . .
