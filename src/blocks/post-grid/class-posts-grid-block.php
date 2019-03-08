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
			'grid'                 => array(
				'type' => 'boolean',
				'default' => false,
			),
			'columns'              => array(
				'type' => 'number',
				'default' => 3,
			),
			'categories'           => array(
				'type' => 'string',
			),
			'postsToShow'          => array(
				'type'    => 'number',
				'default' => 5,
			),
			'order'                => array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy'              => array(
				'type'    => 'string',
				'default' => 'date',
			),
			'displayFeaturedImage' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayCategory'      => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayDate'          => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayAuthor'        => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'excerptLength'        => array(
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
			$thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), 'medium' );
			$category = get_the_category( $id );

			$list_items_markup .= '<div class="grid-post grid-' . $attributes['columns'] . '"><div class="grid-post-row">';

			if ( isset( $attributes['displayFeaturedImage'] ) && $attributes['displayFeaturedImage'] ) {
				if ( $thumbnail ) {
					$list_items_markup .= sprintf(
						'<div class="grid-image-area"><div class="post-thumbnail"><a href="%1$s"><img src="%2$s" alt="%3$s" /></a></div></div>',
						esc_url( get_the_permalink( $id ) ),
						esc_url( $thumbnail[0] ),
						esc_html( get_the_title( $id ) )
					);
				}
			}

			$list_items_markup .= '<div class="grid-content-area' . ( $thumbnail && $attributes['displayFeaturedImage'] ? '' : ' full' ) . '">';

			if ( isset( $attributes['displayCategory'] ) && $attributes['displayCategory'] ) {
				$list_items_markup .= sprintf(
					'<h6 class="grid-content-category"><a href="%1$s">%2$s</a></h6>',
					esc_url( get_category_link( $category[0]->term_id ) ),
					esc_html( $category[0]->cat_name )
				);
			}

			$list_items_markup .= sprintf(
				'<h3 class="grid-content-title"><a href="%1$s">%2$s</a></h6>',
				esc_url( get_the_permalink( $id ) ),
				esc_html( get_the_title( $id ) )
			);

			if ( ( isset( $attributes['displayDate'] ) && $attributes['displayDate'] ) || ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) ) {
				$list_items_markup .= '<p class="grid-content-meta">';

				if ( ( isset( $attributes['displayDate'] ) && $attributes['displayDate'] ) ) {
					$list_items_markup .= sprintf(
						'<time datetime="%1$s">%2$s %3$s </time>',
						esc_attr( get_the_date( 'c', $id ) ),
						__( 'on', 'textdomain' ),
						esc_html( get_the_date( 'j F, Y', $id ) )
					);
				}

				if ( ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) ) {
					$list_items_markup .= sprintf(
						'%1$s <a href="%2$s">%3$s</a>',
						__( 'by', 'textdomain' ),
						get_author_posts_url( get_post_field( 'post_author', $id ) ),
						get_the_author_meta( 'display_name', get_post_field( 'post_author', $id ) )
					);
				}

				$list_items_markup .= '</p>';
			}

			if ( ( isset( $attributes['excerptLength'] ) && $attributes['excerptLength'] > 0 ) ) {
				$list_items_markup .= sprintf(
					'<p class="grid-content-excerpt">%1$s</p>',
					$this->get_excerpt_by_id( $id, $attributes['excerptLength'] )
				);
			}

			$list_items_markup .= '</div></div></div>';
		}

		$class = 'wp-block-themeisle-blocks-posts-grid';

		if ( isset( $attributes['grid'] ) && true === $attributes['grid'] ) {
			$class .= ' is-grid';
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
