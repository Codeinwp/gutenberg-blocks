<?php
/**
 * Woo_Comparison_Block
 *
 * @package ThemeIsle\GutenbergBlocks\Render
 */

namespace ThemeIsle\GutenbergBlocks\Render;

use ThemeIsle\GutenbergBlocks\Base_Block;

/**
 * Class Woo_Comparison_Block
 */
class Woo_Comparison_Block extends Base_Block {

	/**
	 * Woo_Comparison_Block constructor.
	 *
	 * @since   1.7.0
	 * @access  public
	 */
	public function __construct() {
		parent::__construct();

		if ( is_admin() && class_exists( '\Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\Main' ) ) {
			$style_path = neve_is_new_skin() ? '/style-main-new' : '/assets/css/style-legacy';
			wp_enqueue_style( 'neve-style', get_template_directory_uri() . $style_path . ( ( NEVE_DEBUG ) ? '' : '.min' ) . '.css', array( 'neve-gutenberg-style', 'nv-ct-style' ), apply_filters( 'neve_version_filter', NEVE_VERSION ) );

			$style_path = neve_is_new_skin() ? 'css/woocommerce' : 'css/woocommerce-legacy';
			wp_enqueue_style( 'neve-woocommerce', NEVE_ASSETS_URL . $style_path . ( ( NEVE_DEBUG ) ? '' : '.min' ) . '.css', array( 'neve-style', 'woocommerce-general' ), apply_filters( 'neve_version_filter', NEVE_VERSION ) );

			$table = new \Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\Main();
			$table->register_assets();
		}

		if ( is_admin() && class_exists( '\Neve_Pro\Modules\Woocommerce_Booster\Module' ) ) {
			$module = new \Neve_Pro\Modules\Woocommerce_Booster\Module();
			add_action( 'admin_enqueue_scripts', array( $module, 'enqueue_scripts' ) );
		}
	}

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	protected function set_block_slug() {
		$this->block_slug = 'woo-comparison';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	protected function set_attributes() {
		$this->attributes = array(
			'id'        => array(
				'type' => 'string',
			),

			'className' => array(
				'type' => 'string',
			),
			'products'  => array(
				'type'    => 'array',
				'default' => array(),
			),
		);
	}

	/**
	 * Block render function for server-side.
	 *
	 * This method will pe passed to the render_callback parameter and it will output
	 * the server side output of the block.
	 *
	 * @param array $attributes Block attrs.
	 *
	 * @return mixed|string
	 */
	protected function render( $attributes ) {
		if ( ! 'valid' === apply_filters( 'product_neve_license_status', false ) || ! class_exists( 'WooCommerce' ) || ! isset( $attributes['products'] ) || ! class_exists( 'Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\View\Table' ) ) {
			return;
		}

		ob_start();
		$table = new \Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\View\Table();

		$_GET['is_woo_comparison_block'] = true;
		$_GET['product_ids']             = $attributes['products'];
		$table->render_comparison_products_table( true, true );

		$class = isset( $attributes['className'] ) ? $attributes['className'] : '';
		$class = 'nv-ct-enabled nv-ct-comparison-table-content woocommerce ' . esc_attr( $class );

		$output  = '<div class="' . $class . '">';
		$output .= ob_get_contents();
		$output .= '</div>';
		ob_end_clean();
		return $output;
	}
}
