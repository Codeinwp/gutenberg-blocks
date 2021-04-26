FROM hardeepasrani/pirate-brewery

WORKDIR /var/www/html/wp-content/plugins/
RUN git clone https://github.com/Codeinwp/otter-blocks.git

WORKDIR /otter-blocks
RUN composer install

WORKDIR /vendor/codeinwp/
RUN rm -rf gutenberg-blocks && mkdir gutenberg-blocks

WORKDIR /gutenberg-blocks
COPY . .
