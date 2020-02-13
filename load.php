<?php
/**
 * Gutenberg Blocks on demand loading file.
 *
 * @package Gutenberg Blocks
 */

// Load autoloader and register the namespace.
require_once dirname( __FILE__ ) . '/autoloader.php';
$autoloader = new \ThemeIsle\GutenbergBlocks\Autoloader();
$autoloader->add_namespace( '\ThemeIsle\GutenbergBlocks', dirname( __FILE__ ) . '/inc/' );
$autoloader->register();
