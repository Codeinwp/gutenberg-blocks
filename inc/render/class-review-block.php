<?php
/**
 * Review block
 *
 * @package ThemeIsle\GutenbergBlocks\Render
 */

namespace ThemeIsle\GutenbergBlocks\Render;

use ThemeIsle\GutenbergBlocks\Base_Block;

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
				'type' => 'number',
			),
			'discounted'  => array(
				'type' => 'number',
			),
			'image'       => array(
				'type' => 'object',
			),
			'description' => array(
				'type' => 'string',
			),
			'features'    => array(
				'type'    => 'array',
				'default' => array(
					array(
						'title'  => __( 'Stability', 'otter-blocks' ),
						'rating' => 9,
					),
					array(
						'title'  => __( 'Ease of Use', 'otter-blocks' ),
						'rating' => 4,
					),
					array(
						'title'  => __( 'Look & Feel', 'otter-blocks' ),
						'rating' => 9,
					),
					array(
						'title'  => __( 'Price', 'otter-blocks' ),
						'rating' => 7,
					),
				),
			),
			'pros'        => array(
				'type'    => 'array',
				'default' => array(
					__( 'Easy to use', 'otter-blocks' ),
					__( 'Good price', 'otter-blocks' ),
					__( 'Sturdy build and ergonomics', 'otter-blocks' ),
				),
			),
			'cons'        => array(
				'type'    => 'array',
				'default' => array(
					__( 'Incompatible with old versions', 'otter-blocks' ),
					__( 'Hard to assemble', 'otter-blocks' ),
					__( 'Bad color combination', 'otter-blocks' ),
				),
			),
			'links'       => array(
				'type'    => 'array',
				'default' => array(
					array(
						'label'       => __( 'Buy on Amazon', 'otter-blocks' ),
						'href'        => '',
						'isSponsored' => false,
					),
					array(
						'label'       => __( 'Buy on eBay', 'otter-blocks' ),
						'href'        => '',
						'isSponsored' => false,
					),
				),
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

		if ( isset( $attributes['title'] ) && ! empty( $attributes['title'] ) && isset( $attributes['features'] ) && count( $attributes['features'] ) > 0 ) {
			add_action(
				'wp_footer',
				function() use ( $attributes ) {
					echo '<script type="application/ld+json">' . wp_json_encode( $this->get_json_ld( $attributes ) ) . '</script>';
				}
			);
		}

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
		$html .= $this->get_overall_stars( $this->get_overall_ratings( $attributes['features'] ) );
		// translators: Overall rating from 0 to 10.
		$html .= '				<span>' . sprintf( __( '%s out of 10', 'otter-blocks' ), $this->get_overall_ratings( $attributes['features'] ) ) . '</span>';
		$html .= '			</div>';

		if ( isset( $attributes['price'] ) || isset( $attributes['discounted'] ) ) {
			$html .= '			<span class="wp-block-themeisle-blocks-review__header_price">';

			if ( isset( $attributes['price'] ) && isset( $attributes['discounted'] ) ) {
				$html .= '			<del>' . $this->get_currency( isset( $attributes['currency'] ) ? $attributes['currency'] : 'USD' ) . $attributes['price'] . '</del>';
			}

			$html .= $this->get_currency( isset( $attributes['currency'] ) ? $attributes['currency'] : 'USD' ) . ( isset( $attributes['discounted'] ) ? $attributes['discounted'] : $attributes['price'] );
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
				$html .= $this->get_overall_stars( $feature['rating'] );
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
			$html .= '		<h4>' . __( 'Pros', 'otter-blocks' ) . '</h4>';

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
			$html .= '		<h4>' . __( 'Cons', 'otter-blocks' ) . '</h4>';

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
			$html .= '		<span class="wp-block-themeisle-blocks-review__footer_label">' . __( 'Buy this product', 'otter-blocks' ) . '</span>';

			$html .= '		<div class="wp-block-themeisle-blocks-review__footer_buttons">';

			foreach ( $attributes['links'] as $link ) {
				$rel   = ( isset( $link['isSponsored'] ) && true === $link['isSponsored'] ) ? 'sponsored' : 'nofollow';
				$html .= '	<a href="' . esc_url( $link['href'] ) . '" rel="' . $rel . '" target="_blank">' . esc_html( $link['label'] ) . '</a>';
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

		$rating = array_reduce(
			$features,
			function( $carry, $feature ) {
				$carry += $feature['rating'];
				return $carry;
			},
			0
		);

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
			} elseif ( $ratings > 3 && $ratings < 8 && $i < $ratings ) {
				$class = 'medium';
			} elseif ( $ratings > 7 && $ratings <= 10 && $i < $ratings ) {
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
		$symbols = apply_filters(
			'themeisle_gutenberg_currency_symbols',
			array(
				'AED' => '&#x62f;.&#x625;',
				'AFN' => '&#x60b;',
				'ALL' => 'L',
				'AMD' => 'AMD',
				'ANG' => '&fnof;',
				'AOA' => 'Kz',
				'ARS' => '&#36;',
				'AUD' => '&#36;',
				'AWG' => 'Afl.',
				'AZN' => 'AZN',
				'BAM' => 'KM',
				'BBD' => '&#36;',
				'BDT' => '&#2547;&nbsp;',
				'BGN' => '&#1083;&#1074;.',
				'BHD' => '.&#x62f;.&#x628;',
				'BIF' => 'Fr',
				'BMD' => '&#36;',
				'BND' => '&#36;',
				'BOB' => 'Bs.',
				'BRL' => '&#82;&#36;',
				'BSD' => '&#36;',
				'BTC' => '&#3647;',
				'BTN' => 'Nu.',
				'BWP' => 'P',
				'BYR' => 'Br',
				'BYN' => 'Br',
				'BZD' => '&#36;',
				'CAD' => '&#36;',
				'CDF' => 'Fr',
				'CHF' => '&#67;&#72;&#70;',
				'CLP' => '&#36;',
				'CNY' => '&yen;',
				'COP' => '&#36;',
				'CRC' => '&#x20a1;',
				'CUC' => '&#36;',
				'CUP' => '&#36;',
				'CVE' => '&#36;',
				'CZK' => '&#75;&#269;',
				'DJF' => 'Fr',
				'DKK' => 'DKK',
				'DOP' => 'RD&#36;',
				'DZD' => '&#x62f;.&#x62c;',
				'EGP' => 'EGP',
				'ERN' => 'Nfk',
				'ETB' => 'Br',
				'EUR' => '&euro;',
				'FJD' => '&#36;',
				'FKP' => '&pound;',
				'GBP' => '&pound;',
				'GEL' => '&#x20be;',
				'GGP' => '&pound;',
				'GHS' => '&#x20b5;',
				'GIP' => '&pound;',
				'GMD' => 'D',
				'GNF' => 'Fr',
				'GTQ' => 'Q',
				'GYD' => '&#36;',
				'HKD' => '&#36;',
				'HNL' => 'L',
				'HRK' => 'kn',
				'HTG' => 'G',
				'HUF' => '&#70;&#116;',
				'IDR' => 'Rp',
				'ILS' => '&#8362;',
				'IMP' => '&pound;',
				'INR' => '&#8377;',
				'IQD' => '&#x639;.&#x62f;',
				'IRR' => '&#xfdfc;',
				'IRT' => '&#x062A;&#x0648;&#x0645;&#x0627;&#x0646;',
				'ISK' => 'kr.',
				'JEP' => '&pound;',
				'JMD' => '&#36;',
				'JOD' => '&#x62f;.&#x627;',
				'JPY' => '&yen;',
				'KES' => 'KSh',
				'KGS' => '&#x441;&#x43e;&#x43c;',
				'KHR' => '&#x17db;',
				'KMF' => 'Fr',
				'KPW' => '&#x20a9;',
				'KRW' => '&#8361;',
				'KWD' => '&#x62f;.&#x643;',
				'KYD' => '&#36;',
				'KZT' => '&#8376;',
				'LAK' => '&#8365;',
				'LBP' => '&#x644;.&#x644;',
				'LKR' => '&#xdbb;&#xdd4;',
				'LRD' => '&#36;',
				'LSL' => 'L',
				'LYD' => '&#x644;.&#x62f;',
				'MAD' => '&#x62f;.&#x645;.',
				'MDL' => 'MDL',
				'MGA' => 'Ar',
				'MKD' => '&#x434;&#x435;&#x43d;',
				'MMK' => 'Ks',
				'MNT' => '&#x20ae;',
				'MOP' => 'P',
				'MRU' => 'UM',
				'MUR' => '&#x20a8;',
				'MVR' => '.&#x783;',
				'MWK' => 'MK',
				'MXN' => '&#36;',
				'MYR' => '&#82;&#77;',
				'MZN' => 'MT',
				'NAD' => 'N&#36;',
				'NGN' => '&#8358;',
				'NIO' => 'C&#36;',
				'NOK' => '&#107;&#114;',
				'NPR' => '&#8360;',
				'NZD' => '&#36;',
				'OMR' => '&#x631;.&#x639;.',
				'PAB' => 'B/.',
				'PEN' => 'S/',
				'PGK' => 'K',
				'PHP' => '&#8369;',
				'PKR' => '&#8360;',
				'PLN' => '&#122;&#322;',
				'PRB' => '&#x440;.',
				'PYG' => '&#8370;',
				'QAR' => '&#x631;.&#x642;',
				'RMB' => '&yen;',
				'RON' => 'lei',
				'RSD' => '&#1088;&#1089;&#1076;',
				'RUB' => '&#8381;',
				'RWF' => 'Fr',
				'SAR' => '&#x631;.&#x633;',
				'SBD' => '&#36;',
				'SCR' => '&#x20a8;',
				'SDG' => '&#x62c;.&#x633;.',
				'SEK' => '&#107;&#114;',
				'SGD' => '&#36;',
				'SHP' => '&pound;',
				'SLL' => 'Le',
				'SOS' => 'Sh',
				'SRD' => '&#36;',
				'SSP' => '&pound;',
				'STN' => 'Db',
				'SYP' => '&#x644;.&#x633;',
				'SZL' => 'L',
				'THB' => '&#3647;',
				'TJS' => '&#x405;&#x41c;',
				'TMT' => 'm',
				'TND' => '&#x62f;.&#x62a;',
				'TOP' => 'T&#36;',
				'TRY' => '&#8378;',
				'TTD' => '&#36;',
				'TWD' => '&#78;&#84;&#36;',
				'TZS' => 'Sh',
				'UAH' => '&#8372;',
				'UGX' => 'UGX',
				'USD' => '&#36;',
				'UYU' => '&#36;',
				'UZS' => 'UZS',
				'VEF' => 'Bs F',
				'VES' => 'Bs.S',
				'VND' => '&#8363;',
				'VUV' => 'Vt',
				'WST' => 'T',
				'XAF' => 'CFA',
				'XCD' => '&#36;',
				'XOF' => 'CFA',
				'XPF' => 'Fr',
				'YER' => '&#xfdfc;',
				'ZAR' => '&#82;',
				'ZMW' => 'ZK',
			)
		);

		$symbol = isset( $symbols[ $currency ] ) ? $symbols[ $currency ] : '&#36;';

		return $symbol;
	}

	/**
	 * Generate JSON-LD schema
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array
	 */
	public function get_json_ld( $attributes ) {
		$json = array(
			'@context' => 'https://schema.org/',
			'@type'    => 'Product',
			'name'     => $attributes['title'],
		);

		if ( isset( $attributes['image'] ) ) {
			$json['image'] = $attributes['image']['url'];
		}

		if ( isset( $attributes['description'] ) && ! empty( $attributes['description'] ) ) {
			$json['description'] = $attributes['description'];
		}

		$json['review'] = array(
			'@type'        => 'Review',
			'reviewRating' => array(
				'@type'       => 'Rating',
				'ratingValue' => $this->get_overall_ratings( $attributes['features'] ),
				'bestRating'  => 10,
			),
			'author'       => array(
				'@type' => 'Person',
				'name'  => get_the_author(),
			),
		);

		if ( isset( $attributes['links'] ) && count( $attributes['links'] ) > 0 ) {
			$offers = array();

			foreach ( $attributes['links'] as $link ) {
				if ( ! isset( $link['href'] ) || empty( $link['href'] ) ) {
					continue;
				}

				if ( ! isset( $attributes['price'] ) && ! isset( $attributes['discounted'] ) ) {
					continue;
				}

				$offer = array(
					'@type'         => 'Offer',
					'url'           => esc_url( $link['href'] ),
					'priceCurrency' => isset( $attributes['currency'] ) ? $attributes['currency'] : 'USD',
					'price'         => isset( $attributes['discounted'] ) ? $attributes['discounted'] : $attributes['price'],
				);

				array_push( $offers, $offer );
			}

			if ( count( $offers ) > 1 ) {
				$json['offers'] = $offers;
			} elseif ( count( $offers ) === 1 ) {
				$json['offers'] = $offers[0];
			}
		}

		return apply_filters( 'themeisle_gutenberg_review_block_schema', $json, $attributes );
	}
}
