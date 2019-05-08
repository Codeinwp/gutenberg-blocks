<?php
/**
 * Loader for the ThemeIsle\GutenbergBlocks
 *
 * @package     ThemeIsle\GutenbergBlocks
 * @copyright   Copyright (c) 2018, Hardeep Asrani
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.0.0
 */

define( 'THEMEISLE_GUTENBERG_BLOCKS_VERSION', '1.2.2' );
define( 'THEMEISLE_GUTENBERG_BLOCKS_DEV', false );

add_action(
	'plugins_loaded',
	function () {
		// call this only if Gutenberg is active
		if ( function_exists( 'register_block_type' ) ) {
			require_once( dirname( __FILE__ ) . '/class-gutenberg-blocks.php' );
		}
	}
);
