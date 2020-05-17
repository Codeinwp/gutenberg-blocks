<?php
/**
 * Library server logic.
 *
 * @package ThemeIsle\GutenbergBlocks\Server
 */

namespace ThemeIsle\GutenbergBlocks\Server;

use WP_Error;

/**
 * Class Template_Library_Server
 */
class Template_Library_Server {

	/**
	 * The main instance var.
	 *
	 * @var Template_Library_Server
	 */
	public static $instance = null;

	/**
	 * Rest route namespace.
	 *
	 * @var Template_Library_Server
	 */
	public $namespace = 'themeisle-gutenberg-blocks/';

	/**
	 * Rest route version.
	 *
	 * @var Template_Library_Server
	 */
	public $version = 'v1';

	/**
	 * Initialize the class
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		$namespace = $this->namespace . $this->version;

		register_rest_route(
			$namespace,
			'/fetch_templates',
			array(
				array(
					'methods'  => \WP_REST_Server::READABLE,
					'callback' => array( $this, 'fetch_templates' ),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/import_template',
			array(
				array(
					'methods'  => \WP_REST_Server::READABLE,
					'callback' => array( $this, 'import_template' ),
					'args'     => array(
						'url' => array(
							'type'        => 'string',
							'required'    => true,
							'description' => __( 'URL of the JSON file.', 'textdomain' ),
						),
					),
				),
			)
		);
	}

	/**
	 * Function to fetch templates.
	 *
	 * @param \WP_REST_Request $request Rest request.
	 *
	 * @return array|bool|\WP_Error
	 */
	public function fetch_templates( \WP_REST_Request $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		$templates_list = array(
			array(
				'title'          => __( 'Header with Video', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'header', 'video' ),
				'categories'     => array( 'header' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/header-video/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/header-video/screenshot.png',
			),
			array(
				'title'          => __( 'Blogger Header', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'header' ),
				'categories'     => array( 'header', 'blogger' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/blogger-header/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/blogger-header/screenshot.png',
			),
			array(
				'title'          => __( 'Blogger About', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'about' ),
				'categories'     => array( 'about', 'blogger' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/blogger-about/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/blogger-about/screenshot.png',
			),
			array(
				'title'          => __( 'Services Simple', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'services', 'features' ),
				'categories'     => array( 'services' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/services-simple/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/services-simple/screenshot.png',
			),
			array(
				'title'          => __( 'Services Round Icons', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'services', 'features', 'icons' ),
				'categories'     => array( 'services' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/services-round-icons/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/services-round-icons/screenshot.png',
			),
			array(
				'title'          => __( 'Services Image Background', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'services', 'features' ),
				'categories'     => array( 'services' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/services-image-background/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/services-image-background/screenshot.png',
			),
			array(
				'title'          => __( 'Pricing Boxed', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'pricing' ),
				'categories'     => array( 'pricing' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/pricing-boxed/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/pricing-boxed/screenshot.png',
			),
			array(
				'title'          => __( 'Pricing Hestia', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'pricing', 'hestia' ),
				'categories'     => array( 'pricing' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/pricing-hestia/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/pricing-hestia/screenshot.png',
			),
			array(
				'title'          => __( 'Testimonials Simple', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'testimonials', 'quote' ),
				'categories'     => array( 'testimonials' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/testimonials-simple/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/testimonials-simple/screenshot.png',
			),
			array(
				'title'          => __( 'Testimonials Boxed', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'testimonials', 'quote', 'boxed' ),
				'categories'     => array( 'testimonials' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/testimonials-boxed/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/testimonials-boxed/screenshot.png',
			),
			array(
				'title'          => __( 'About with Map', 'textdomain' ),
				'type'           => 'block',
				'author'         => __( 'Otter', 'textdomain' ),
				'keywords'       => array( 'about', 'social', 'maps', 'footer' ),
				'categories'     => array( 'about', 'footer' ),
				'template_url'   => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/about-with-map/template.json',
				'screenshot_url' => 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/about-with-map/screenshot.png',
			),
		);

		$templates = apply_filters( 'themeisle_gutenberg_templates', $templates_list );

		return rest_ensure_response( $templates );
	}

	/**
	 * Function to fetch template JSON.
	 *
	 * @param \WP_REST_Request $request Rest request.
	 *
	 * @return array|bool|\WP_Error
	 */
	public function import_template( $request ) {
		global $wp_filesystem;

		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		require_once ABSPATH . '/wp-admin/includes/file.php';
		WP_Filesystem();

		$url      = $request->get_param( 'url' );
		$site_url = get_site_url();

		if ( strpos( $url, $site_url ) !== false ) {
			$url = str_replace( $site_url, ABSPATH, $url );

			if ( $wp_filesystem->exists( $url ) ) {
				$json = $wp_filesystem->get_contents( $url );
			} else {
				return new WP_Error( 'filesystem_error', __( 'File doesn\'t exist', 'textdomain' ) );
			}
		} else {
			if ( function_exists( 'vip_safe_wp_remote_get' ) ) {
				$request = vip_safe_wp_remote_get( $url );
			} else {
				$request = wp_remote_get( $url ); //phpcs:ignore WordPressVIPMinimum.VIP.RestrictedFunctions.wp_remote_get_wp_remote_get
			}

			$json = wp_remote_retrieve_body( $request );
		}

		$obj = json_decode( $json );
		return rest_ensure_response( $obj );
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.0.0
	 * @access public
	 * @return Template_Library_Server
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
	 * @since 1.0.0
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
	 * @since 1.0.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}
