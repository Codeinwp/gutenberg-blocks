<?php
/**
 * Grid block
 *
 * @package ThemeIsle\GutenbergBlocks\Render
 */

namespace ThemeIsle\GutenbergBlocks\Render;

use ThemeIsle\GutenbergBlocks\Base_Block;

/**
 * Class Posts_Grid_Block
 */
class Posts_Grid_Block extends Base_Block {


	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 */
	protected function set_block_slug() {
		$this->block_slug = 'posts-grid';
	}

	/**
	 * Set the attributes required on the server side.
	 */
	protected function set_attributes() {
		$this->attributes = array(
			'style'                => array(
				'type'    => 'string',
				'default' => 'grid',
			),
			'columns'              => array(
				'type'    => 'number',
				'default' => 3,
			),
			'template'             => array(
				'type'    => 'object',
				'default' => array(
					'category',
					'title',
					'meta',
					'description',
				),
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
			'imageSize'            => array(
				'type'    => 'string',
				'default' => 'full',
			),
			'imageBoxShadow'       => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayFeaturedImage' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayCategory'      => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayTitle'         => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'titleTag'             => array(
				'type'    => 'string',
				'default' => 'h5',
			),
			'displayMeta'          => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayDescription'   => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'excerptLength'        => array(
				'type'    => 'number',
				'default' => '200',
			),
			'displayDate'          => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayAuthor'        => array(
				'type'    => 'boolean',
				'default' => true,
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
			$id        = $post['ID'];
			$size      = isset( $attributes['imageSize'] ) ? $attributes['imageSize'] : 'medium';
			$thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), $size );
			$category  = get_the_category( $id );

			$list_items_markup .= '<div class="wp-block-themeisle-blocks-posts-grid-post-blog wp-block-themeisle-blocks-posts-grid-post-plain"><div class="wp-block-themeisle-blocks-posts-grid-post">';

			if ( isset( $attributes['displayFeaturedImage'] ) && $attributes['displayFeaturedImage'] ) {
				if ( $thumbnail ) {
					$list_items_markup .= sprintf(
						'<div class="wp-block-themeisle-blocks-posts-grid-post-image"><a href="%1$s"><img src="%2$s" alt="%3$s" /></a></div>',
						esc_url( get_the_permalink( $id ) ),
						esc_url( $thumbnail[0] ),
						esc_html( get_the_title( $id ) )
					);
				}
			}

			$list_items_markup .= '<div class="wp-block-themeisle-blocks-posts-grid-post-body' . ( $thumbnail && $attributes['displayFeaturedImage'] ? '' : ' is-full' ) . '">';

			foreach ( $attributes['template'] as $element ) {
				if ( 'category' === $element ) {
					if ( isset( $attributes['displayCategory'] ) && $attributes['displayCategory'] ) {
						$list_items_markup .= sprintf(
							'<span class="wp-block-themeisle-blocks-posts-grid-post-category">%1$s</span>',
							esc_html( $category[0]->cat_name )
						);
					}
				}

				if ( 'title' === $element ) {
					if ( isset( $attributes['displayTitle'] ) && $attributes['displayTitle'] ) {
						$list_items_markup .= sprintf(
							'<%1$s class="wp-block-themeisle-blocks-posts-grid-post-title"><a href="%2$s">%3$s</a></%1$s>',
							esc_attr( $attributes['titleTag'] ),
							esc_url( get_the_permalink( $id ) ),
							esc_html( get_the_title( $id ) )
						);
					}
				}

				if ( 'meta' === $element ) {
					if ( ( isset( $attributes['displayMeta'] ) && $attributes['displayMeta'] ) && ( ( isset( $attributes['displayDate'] ) && $attributes['displayDate'] ) || ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) ) ) {
						$list_items_markup .= '<p class="wp-block-themeisle-blocks-posts-grid-post-meta">';

						if ( isset( $attributes['displayDate'] ) && $attributes['displayDate'] ) {
							$list_items_markup .= sprintf(
								'%1$s <time datetime="%2$s">%3$s</time> ',
								__( 'on', 'textdomain' ),
								esc_attr( get_the_date( 'c', $id ) ),
								esc_html( get_the_date( 'j F, Y', $id ) )
							);
						}

						if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
							$list_items_markup .= sprintf(
								'%1$s %2$s',
								__( 'by', 'textdomain' ),
								get_the_author_meta( 'display_name', get_post_field( 'post_author', $id ) )
							);
						}

						$list_items_markup .= '</p>';
					}
				}

				if ( 'description' === $element ) {
					if ( ( isset( $attributes['excerptLength'] ) && $attributes['excerptLength'] > 0 ) && ( isset( $attributes['displayDescription'] ) && $attributes['displayDescription'] ) ) {
						$list_items_markup .= sprintf(
							'<p class="wp-block-themeisle-blocks-posts-grid-post-description">%1$s</p>',
							$this->get_excerpt_by_id( $id, $attributes['excerptLength'] )
						);
					}
				}
			}

			$list_items_markup .= '</div></div></div>';
		}

		$class = 'wp-block-themeisle-blocks-posts-grid';

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . esc_attr( $attributes['className'] );
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

		if ( ( isset( $attributes['style'] ) && 'grid' === $attributes['style'] ) || ( isset( $attributes['grid'] ) && true === $attributes['grid'] ) ) {
			$class .= ' wp-block-themeisle-blocks-posts-grid-columns-' . $attributes['columns'];
		}

		if ( isset( $attributes['imageBoxShadow'] ) && true === $attributes['imageBoxShadow'] ) {
			$class .= ' has-shadow';
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
	 * @param int $post_id Post id.
	 * @param int $excerpt_length Excerpt size.
	 *
	 * @return string
	 */
	protected function get_excerpt_by_id( $post_id, $excerpt_length = 200 ) {
		if ( has_excerpt( $post_id ) ) {
			$excerpt = get_the_excerpt( $post_id );
		} else {
			$post    = get_post( $post_id );
			$excerpt = $post->post_content;
			$excerpt = wp_strip_all_tags( strip_shortcodes( $excerpt ) );
		}

		if ( strlen( $excerpt ) > $excerpt_length ) {
			$excerpt = substr( $excerpt, 0, $excerpt_length ) . '…';
		}

		return $excerpt;
	}
}
