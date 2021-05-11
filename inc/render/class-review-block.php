<?php
/**
 * Review block
 *
 * @package ThemeIsle\GutenbergBlocks\Render
 */

namespace ThemeIsle\GutenbergBlocks\Render;

use ThemeIsle\GutenbergBlocks\Base_Block;

use Symfony\Component\Intl\Intl;

/**
 * Class Review_Block
 */
class Review_Block extends Base_Block {

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	protected function set_block_slug() {
		$this->block_slug = 'review';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	protected function set_attributes() {
		$this->attributes = array(
			'id'          => array(
				'type' => 'string',
			),
			'className'   => array(
				'type' => 'string',
			),
			'title'       => array(
				'type' => 'string',
			),
			'currency'    => array(
				'type'    => 'string',
				'default' => 'USD',
			),
			'price'       => array(
				'type'    => 'number',
			),
			'discounted'  => array(
				'type'    => 'number',
			),
			'image'       => array(
				'type'    => 'object',
			),
			'description' => array(
				'type'    => 'string',
			),
			'features'    => array(
				'type'    => 'array',
				'default' => array(
					array(
						'title'  => __( 'Stability', 'textdomain' ),
						'rating' => 9,
					),
					array(
						'title'  => __( 'Ease of Use', 'textdomain' ),
						'rating' => 4,
					),
					array(
						'title'  => __( 'Look & Feel', 'textdomain' ),
						'rating' => 9,
					),
					array(
						'title'  => __( 'Price', 'textdomain' ),
						'rating' => 7,
					),
				),
			),
			'pros'        => array(
				'type'    => 'array',
				'default' => array(
					__( 'Easy to use', 'textdomain' ),
					__( 'Good price', 'textdomain' ),
					__( 'Sturdy build and ergonomics', 'textdomain' ),
				),
			),
			'cons'        => array(
				'type'    => 'array',
				'default' => array(
					__( 'Incompatible with old versions', 'textdomain' ),
					__( 'Hard to assemble', 'textdomain' ),
					__( 'Bad color combination', 'textdomain' ),
				),
			),
			'links'       => array(
				'type'    => 'array',
				'default' => array(
					array(
						'label' => __( 'Buy on Amazon', 'textdomain' ),
						'href' => ''
					),
					array(
						'label' => __( 'Buy on eBay', 'textdomain' ),
						'href' => ''
					)
				)
			),
		);
	}

	/**
	 * Block render function for server-side.
	 *
	 * This method will pe passed to the render_callback parameter and it will output
	 * the server side output of the block.
	 *
	 * @param array $attributes Blocks attrs.
	 *
	 * @return mixed|string
	 */
	protected function render( $attributes ) {
		$id        = isset( $attributes['id'] ) ? $attributes['id'] : 'wp-block-themeisle-blocks-review-' . wp_rand( 10, 100 );
		$class     = isset( $attributes['className'] ) ? $attributes['className'] : '';
		$class     = 'wp-block-themeisle-blocks-review ' . esc_attr( $class );
		$is_single = ( isset( $attributes['image'] ) && isset( $attributes['description'] ) && ! empty( $attributes['description'] ) ) ? '' : ' is-single';

		$html  = '<div id="' . esc_attr( $id ) . '" class="' . trim( $class ) . '">';
		$html .= '  <div class ="wp-block-themeisle-blocks-review__header">';

		if ( isset( $attributes['title'] ) && ! empty( $attributes['title'] ) ) {
			$html .= '<h3>' . esc_html( $attributes['title'] ) . '</h3>';
		}

		$html .= '		<div class="wp-block-themeisle-blocks-review__header_meta">';
		$html .= '			<div class="wp-block-themeisle-blocks-review__header_ratings">';
		$html .= 				$this->get_overall_stars( $this->get_overall_ratings( $attributes['features'] ) );
		$html .= '				<span>' . sprintf( __( '%s out of 10' ), $this->get_overall_ratings( $attributes['features'] ) ) . '</span>';
		$html .= '			</div>';

		if ( isset( $attributes['price'] ) || isset( $attributes['discounted'] ) ) {
			$html .= '			<span class="wp-block-themeisle-blocks-review__header_price">';

			if ( isset( $attributes['price'] ) && isset( $attributes['discounted'] ) ) {
				$html .= '			<del>' . $this->get_currency( isset( $attributes['currency'] ) ? $attributes['currency'] : 'USD' ) . $attributes['price'] . '</del>';
			}

			$html .= 			$this->get_currency( isset( $attributes['currency'] ) ? $attributes['currency'] : 'USD' ) . ( isset( $attributes['discounted'] ) ? $attributes['discounted'] : $attributes['price'] );
			$html .= '			</span>';
		}

		$html .= '		</div>';
		$html .= '  </div>';

		$html .= '	<div class="wp-block-themeisle-blocks-review__left">';
		if ( ( isset( $attributes['image'] ) || ( isset( $attributes['description'] ) && ! empty( $attributes['description'] ) ) ) ) {
			$html .= '	<div class="wp-block-themeisle-blocks-review__left_details' . $is_single . '">';
			if ( isset( $attributes['image'] ) ) {
				$html .= '	<img src="' . $attributes['image']['url'] . '" alt="' . $attributes['image']['alt'] . '"/>';
			}

			if ( isset( $attributes['description'] ) && ! empty( $attributes['description'] ) ) {
				$html .= '	<p>' . $attributes['description'] . '</p>';
			}	
			$html .= '	</div>';
		}

		if ( isset( $attributes['features'] ) && count( $attributes['features'] ) > 0 ) {
			$html .= '	<div class="wp-block-themeisle-blocks-review__left_features">';
			foreach ( $attributes['features'] as $feature ) {
				$html .= '	<div class="wp-block-themeisle-blocks-review__left_feature">';
				if ( isset( $feature['title'] ) ) {
					$html .= '	<span class="wp-block-themeisle-blocks-review__left_feature_title">' . $feature['title'] . '</span>';
				}

				$html .= '		<div class="wp-block-themeisle-blocks-review__left_feature_ratings">';
				$html .= 			$this->get_overall_stars( $feature['rating'] );
				$html .= '			<span>' . $feature['rating'] . '/10</span>';
				$html .= '		</div>';
				$html .= '	</div>';
			}
			$html .= '	</div>';
		}
		$html .= '	</div>';

		$html .= '	<div class="wp-block-themeisle-blocks-review__right">';
		if ( isset( $attributes['pros'] ) && count( $attributes['pros'] ) > 0 ) {
			$html .= '	<div class="wp-block-themeisle-blocks-review__right_pros">';
			$html .= '		<h4>' . __( 'Pros', 'textdomain' ) . '</h4>';

			foreach ( $attributes['pros'] as $pro ) {
				$html .= '	<div class="wp-block-themeisle-blocks-review__right_pros_item">';
				$html .= '		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.3 5.6L9.9 16.9l-4.6-3.4-.9 2.4 5.8 4.3 9.3-12.6z" /></svg>';
				$html .= '		<p>' . esc_html( $pro ) . '</p>';
				$html .= '	</div>';
			}
			$html .= '	</div>';
		}

		if ( isset( $attributes['cons'] ) && count( $attributes['cons'] ) > 0 ) {
			$html .= '	<div class="wp-block-themeisle-blocks-review__right_cons">';
			$html .= '		<h4>' . __( 'Cons', 'textdomain' ) . '</h4>';

			foreach ( $attributes['cons'] as $con ) {
				$html .= '	<div class="wp-block-themeisle-blocks-review__right_cons_item">';
				$html .= '		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z" /></svg>';
				$html .= '		<p>' . esc_html( $con ) . '</p>';
				$html .= '	</div>';
			}
			$html .= '	</div>';
		}
		$html .= '	</div>';

		if ( isset( $attributes['links'] ) && count( $attributes['links'] ) > 0 ) {
			$html .= '	<div class="wp-block-themeisle-blocks-review__footer">';
			$html .= '		<span class="wp-block-themeisle-blocks-review__footer_label">' . __( 'Buy this product', 'textdomain' ) . '</span>';

			$html .= '		<div class="wp-block-themeisle-blocks-review__footer_buttons">';

			foreach ( $attributes['links'] as $link ) {
				$html .= '	<a href="' . $link['href'] . '" target="_blank">' . $link['label'] . '</a>';
			}
			$html .= '		</div>';
			$html .= '	</div>';
		}
		$html .= '</div>';

		return $html;
	}

	/**
	 * Get overall ratings
	 *
	 * @param array $features An array of features.
	 *
	 * @return int
	 */
	protected function get_overall_ratings( $features ) {
		if ( count( $features ) <= 0 ) {
			return 0;
		}

		$rating = array_reduce( $features, function( $carry, $feature ) {
			$carry += $feature['rating'];
			return $carry;
		}, 0 );

		$rating = round( $rating / count( $features ) );

		return $rating;
	}

	/**
	 * Get overall ratings stars
	 *
	 * @param array $ratings Overall ratings of features.
	 *
	 * @return string
	 */
	protected function get_overall_stars( $ratings = 0 ) {
		$stars = '';

		for ( $i = 0; $i < 10; $i++ ) {
			$class = '';

			if ( $ratings <= 3 && $i < $ratings ) {
				$class = 'low';
			} else if ( $ratings > 3 && $ratings < 8 && $i < $ratings ) {
				$class = 'medium';
			} else if ( $ratings > 7 && $ratings <= 10 && $i < $ratings ) {
				$class = 'high';
			}

			$stars .= '<svg xmlns="http://www.w3.org/2000/svg" class="' . esc_attr( $class ) . '" viewbox="0 0 24 24"><path d="M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z" /></svg>';
		}

		return $stars;
	}

	/**
	 * Get currency symbol
	 *
	 * @param string $currency Currency.
	 *
	 * @return string
	 */
	protected function get_currency( $currency = 'USD' ) {
        $symbol = Intl::getCurrencyBundle()->getCurrencySymbol( $currency, 'en' );
		return $symbol;
	}
}
