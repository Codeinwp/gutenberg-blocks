<?php
namespace ThemeIsle\GutenbergBlocks;

/**
 * Class Posts_Grid_Block
 */
class Posts_Grid_Block extends Base_Block {

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
		$this->block_slug = 'posts-grid';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	function set_attributes() {
		$this->attributes = array(
			'style'					=> array(
				'type' => 'string',
				'default' => 'grid',
			),
			'columns'				=> array(
				'type' => 'number',
				'default' => 3,
			),
			'template'				=> array(
				'type' => 'object',
				'default' => array(
					'category',
					'title',
					'meta',
					'description'
				),
			),
			'categories'			=> array(
				'type' => 'string',
			),
			'postsToShow'			=> array(
				'type'    => 'number',
				'default' => 5,
			),
			'order'					=> array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy'				=> array(
				'type'    => 'string',
				'default' => 'date',
			),
			'imageSize'				=> array(
				'type'    => 'string',
				'default' => 'full',
			),
			'displayFeaturedImage'	=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayCategory'		=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayTitle'			=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayMeta'			=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayDescription'	=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'excerptLength'			=> array(
				'type'    => 'number',
				'default' => '200',
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
		$recent_posts = wp_get_recent_posts(
			array(
				'numberposts' => $attributes['postsToShow'],
				'post_status' => 'publish',
				'order'       => $attributes['order'],
				'orderby'     => $attributes['orderBy'],
				'category'    => isset( $attributes['categories'] ) ? $attributes['categories'] : 0,
			)
		);

		$list_items_markup = '';

		foreach ( $recent_posts as $post ) {
			$id = $post['ID'];
			$size = isset( $attributes['imageSize'] ) ? $attributes['imageSize'] : 'medium';
			$thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), $size );
			$category = get_the_category( $id );

			$list_items_markup .= '<div class="posts-grid-post-blog posts-grid-post-plain"><div class="posts-grid-post">';

			if ( isset( $attributes['displayFeaturedImage'] ) && $attributes['displayFeaturedImage'] ) {
				if ( $thumbnail ) {
					$list_items_markup .= sprintf(
						'<div class="posts-grid-post-image"><a href="%1$s"><img src="%2$s" alt="%3$s" /></a></div>',
						esc_url( get_the_permalink( $id ) ),
						esc_url( $thumbnail[0] ),
						esc_html( get_the_title( $id ) )
					);
				}
			}

			$list_items_markup .= '<div class="posts-grid-post-body' . ( $thumbnail && $attributes['displayFeaturedImage'] ? '' : ' is-full' ) . '">';

			foreach( $attributes['template'] as $element ) {
				if ( $element === 'category' ) {
					if ( isset( $attributes['displayCategory'] ) && $attributes['displayCategory'] ) {
						$list_items_markup .= sprintf(
							'<h6 class="posts-grid-post-category">%1$s</h6>',
							esc_html( $category[0]->cat_name )
						);
					}
				}

				if ( $element === 'title' ) {
					if ( isset( $attributes['displayTitle'] ) && $attributes['displayTitle'] ) {
						$list_items_markup .= sprintf(
							'<h5 class="posts-grid-post-title"><a href="%1$s">%2$s</a></h5>',
							esc_url( get_the_permalink( $id ) ),
							esc_html( get_the_title( $id ) )
						);
					}
				}

				if ( $element === 'meta' ) {
					if ( ( isset( $attributes['displayMeta'] ) && $attributes['displayMeta'] )  ) {
						$list_items_markup .= '<p class="posts-grid-post-meta">';
		
						$list_items_markup .= sprintf(
							'%1$s <time datetime="%2$s">%3$s</time> %4$s %5$s',
							__( 'on', 'textdomain' ),
							esc_attr( get_the_date( 'c', $id ) ),
							esc_html( get_the_date( 'j F, Y', $id ) ),
							__( 'by', 'textdomain' ),
							get_the_author_meta( 'display_name', get_post_field( 'post_author', $id ) )
						);
		
						$list_items_markup .= '</p>';
					}
				}

				if ( $element === 'description' ) {
					if ( ( isset( $attributes['excerptLength'] ) && $attributes['excerptLength'] > 0 ) && ( isset( $attributes['displayDescription'] ) && $attributes['displayDescription'] ) ) {
						$list_items_markup .= sprintf(
							'<p class="posts-grid-post-description">%1$s</p>',
							$this->get_excerpt_by_id( $id, $attributes['excerptLength'] )
						);
					}
				}
			}

			$list_items_markup .= '</div></div></div>';
		}

		$class = 'wp-block-themeisle-blocks-posts-grid';

		if ( isset( $attributes['className'] ) ) {
			$class .=  ' ' . esc_attr( $attributes['className'] );
		}

		if ( isset( $attributes['align'] ) ) {
			$class .= ' align' . $attributes['align'];
		}

		if ( isset( $attributes['grid'] ) && true === $attributes['grid'] ) {
			$class .= ' is-grid';
		}

		if ( isset( $attributes['style'] ) ) {
			$class .= ' is-' . $attributes['style'];
		}

		if ( ( isset( $attributes['style'] ) && $attributes['style'] === 'grid' ) || ( isset( $attributes['grid'] ) && true === $attributes['grid'] ) ) {
			$class .= ' posts-grid-columns-' . $attributes['columns'];
		}

		$block_content = sprintf(
			'<div class="%1$s">%2$s</div>',
			esc_attr( $class ),
			$list_items_markup
		);

		return $block_content;
	}

	/**
	 * Get post excerpt
	 *
	 * @return string
	 */
	function get_excerpt_by_id( $post_id, $excerpt_length = 200 ) {
		$the_post = get_post( $post_id );
		$the_excerpt = $the_post->post_content;
		$the_excerpt = strip_tags( strip_shortcodes( $the_excerpt ) );
		$the_excerpt = substr( $the_excerpt, 0, $excerpt_length ) . '…';
		return $the_excerpt;
	}
}
