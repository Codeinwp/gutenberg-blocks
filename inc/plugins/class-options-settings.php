<?php
/**
 * Options.
 *
 * @package ThemeIsle\GutenbergBlocks\Plugins
 */

namespace ThemeIsle\GutenbergBlocks\Plugins;

/**
 * Class Options_Settings
 */
class Options_Settings {

	/**
	 * The main instance var.
	 *
	 * @var Options_Settings
	 */
	protected static $instance = null;

	/**
	 * Initialize the class
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_settings' ), 99 );
		add_action( 'init', array( $this, 'default_block' ), 99 );
	}

	/**
	 * Register Settings
	 *
	 * @since   1.2.0
	 * @access  public
	 */
	public function register_settings() {
		register_setting(
			'themeisle_blocks_settings',
			'themeisle_google_map_block_api_key',
			array(
				'type'              => 'string',
				'description'       => __( 'Google Map API key for the Google Maps Gutenberg Block.', 'textdomain' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);

		register_setting(
			'themeisle_blocks_settings',
			'themeisle_blocks_settings_default_block',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Make Section block your default block for Pages?', 'textdomain' ),
				'sanitize_callback' => 'rest_sanitize_boolean',
				'show_in_rest'      => true,
				'default'           => true,
			)
		);

		register_setting(
			'themeisle_blocks_settings',
			'themeisle_blocks_settings_global_defaults',
			array(
				'type'              => 'string',
				'description'       => __( 'Global defaults for Gutenberg Blocks.', 'textdomain' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => '',
			)
		);

		register_setting(
			'themeisle_blocks_settings',
			'themeisle_allow_json_upload',
			array(
				'type'              => 'boolean',
				'description'       => __( 'Allow JSON Upload to Media Library.', 'textdomain' ),
				'sanitize_callback' => 'rest_sanitize_boolean',
				'show_in_rest'      => true,
				'default'           => false,
			)
		);
	}

	/**
	 * Display Default Block
	 *
	 * @since   1.2.0
	 * @access  public
	 */
	public function default_block() {
		if ( ! get_option( 'themeisle_blocks_settings_default_block', true ) ) {
			return;
		}

		$post_type_object           = get_post_type_object( 'page' );
		$post_type_object->template = array(
			array( 'themeisle-blocks/advanced-columns' ),
		);
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.2.0
	 * @access public
	 * @return Options_Settings
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->init();
		}

		return self::$instance;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @access public
	 * @since 1.2.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access public
	 * @since 1.2.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}
