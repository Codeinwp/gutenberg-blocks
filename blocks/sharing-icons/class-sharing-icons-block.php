<?php

namespace ThemeIsle\GutenbergBlocks;

/**
 * Class Sharing_Icons_Block
 */
class Sharing_Icons_Block extends Base_Block {

	/**
	 * Social media attribites.
	 *
	 * @var array
	 */
	protected $social_attributes = array();

	/**
	 * Constructor function for the module.
	 *
	 * @method __construct
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	function set_block_slug() {
		$this->block_slug = 'sharing-icons';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	function set_attributes() {
		$this->social_attributes = array(
			'facebook' => array(
				'label'   => esc_html__( 'Facebook', 'textdomain' ),
				'icon' => 'facebook-f',
				'url' => 'https://www.facebook.com/sharer/sharer.php?u=' . get_the_permalink() . '&title=' . get_the_title(),
			),

			'twitter' => array(
				'label'   => esc_html__( 'Twitter', 'textdomain' ),
				'icon' => 'twitter',
				'url' => 'http://twitter.com/share?url=' . get_the_permalink() . '&text=' . get_the_title(),
			),

			'googleplus' => array(
				'label'   => esc_html__( 'Google Plus', 'textdomain' ),
				'icon' => 'google-plus-g',
				'url' => 'https://plus.google.com/share?url=' . get_the_permalink() . '&text=' . get_the_title(),
			),

			'linkedin' => array(
				'label'   => esc_html__( 'Linkedin', 'textdomain' ),
				'icon' => 'linkedin-in',
				'url' => 'https://www.linkedin.com/shareArticle?mini=true&url=' . get_the_permalink() . '&title=' . get_the_title(),
			),

			'pinterest' => array(
				'label'   => esc_html__( 'Pinterest', 'textdomain' ),
				'icon' => 'pinterest-p',
				'url' => 'https://pinterest.com/pin/create/button/?url=' . get_the_permalink() . '&description=' . get_the_title(),
			),

			'tumblr' => array(
				'label'   => esc_html__( 'Tumblr', 'textdomain' ),
				'icon' => 'tumblr',
				'url' => 'https://tumblr.com/share/link?url=' . get_the_permalink() . '&name=' . get_the_title(),
			),

			'reddit' => array(
				'label'   => esc_html__( 'Reddit', 'textdomain' ),
				'icon' => 'reddit-alien',
				'url' => 'https://www.reddit.com/submit?url=' . get_the_permalink(),
			),
		);

		$this->attributes = array(
			'facebook'  => array(
				'type'    => 'boolean',
				'default' => 1,
			),
			'twitter'  => array(
				'type'    => 'boolean',
				'default' => 1,
			),
			'googleplus'  => array(
				'type'    => 'boolean',
				'default' => 1,
			),
			'linkedin'  => array(
				'type'    => 'boolean',
				'default' => 1,
			),
			'pinterest'  => array(
				'type'    => 'boolean',
				'default' => 0,
			),
			'tumblr'  => array(
				'type'    => 'boolean',
				'default' => 0,
			),
			'reddit'  => array(
				'type'    => 'boolean',
				'default' => 0,
			),
			'className'  => array(
				'type'    => 'string',
			),
		);
	}

	/**
	 * Block render function for server-side.
	 *
	 * This method will pe passed to the render_callback parameter and it will output
	 * the server side output of the block.
	 *
	 * @return mixed|string
	 */
	function render( $attributes ) {
		if ( strpos( $attributes['className'], 'is-style-icons' ) !== false ) {
			$class = 'wp-block-themeisle-blocks-sharing-icons';
		} else {
			$class = 'wp-block-themeisle-blocks-sharing-icons has-label';
		}
		$html = '<div class="' . $class . '">';
		foreach ( $this->attributes as $key => $icon ) {
			if ( $key !== 'className' && $attributes[ $key ] == 1 ) {
				$html .= '<a class="social-icon is-' . $key . '" href="' . $this->social_attributes[ $key ]['url'] . '" target="_blank">';
				$html .= '<i class="fab fa-' . $this->social_attributes[ $key ]['icon'] . '"></i>';
				if ( strpos( $attributes['className'], 'is-style-icons' ) === false ) {
					$html .= $this->social_attributes[ $key ]['label'];
				}
				$html .= '</a>';
			}
		}
		$html .= '</div>';
		return $html;
	}
}
