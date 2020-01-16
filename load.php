<?php
/**
 * Loader for the ThemeIsle\GutenbergBlocks
 *
 * @package     ThemeIsle\GutenbergBlocks
 * @copyright   Copyright (c) 2018, Hardeep Asrani
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       1.0.0
 */

define( 'THEMEISLE_GUTENBERG_BLOCKS_VERSION', '1.3.4' );
define( 'THEMEISLE_GUTENBERG_BLOCKS_DEV', false );

require_once dirname( __FILE__ ) . '/autoloader.php';

$autoloader = new \ThemeIsle\GutenbergBlocks\Autoloader();
$autoloader->add_namespace( '\ThemeIsle\GutenbergBlocks', dirname( __FILE__ ) . '/inc/' );
$autoloader->register();

if ( function_exists(
	'add_action'
) ) {
	add_action(
		'plugins_loaded',
		function () {
			// call this only if Gutenberg is active.
			if ( function_exists( 'register_block_type' ) ) {
				require_once dirname( __FILE__ ) . '/inc/class-gutenberg-blocks.php';
			}
		}
	);
}
