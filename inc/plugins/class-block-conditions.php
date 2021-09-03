<?php
/**
 * Block Conditions.
 *
 * @package ThemeIsle\GutenbergBlocks\Plugins
 */

namespace ThemeIsle\GutenbergBlocks\Plugins;

/**
 * Class Block_Conditions
 */
class Block_Conditions {

	/**
	 * The main instance var.
	 *
	 * @var Block_Conditions
	 */
	protected static $instance = null;

	/**
	 * Initialize the class
	 */
	public function init() {
		add_action( 'render_block', array( $this, 'render_blocks' ), 999, 2 );
		add_action( 'wp_loaded', array( $this, 'add_attributes_to_blocks' ), 999 );
	}

	/**
	 * Render Block
	 *
	 * @param string $block_content Content of block.
	 * @param array  $block Block Attributes.
	 * 
	 * @since   1.7.0
	 * @access  public
	 */
	public function render_blocks( $block_content, $block ) {
		if ( ! is_admin() && ! ( defined( 'REST_REQUEST' ) && REST_REQUEST ) && isset( $block['attrs']['otterConditions'] ) && 'valid' === apply_filters( 'product_neve_license_status', false ) ) {
			$display = true;

			foreach ( $block['attrs']['otterConditions'] as $group ) {
				if ( 0 === count( $group ) ) {
					continue;
				}

				$visibility = true;

				foreach ( $group as $condition ) {
					if ( ! $this->evaluate_condition( $condition ) ) {
						$visibility = false;
					}
				}

				if ( true === $visibility ) {
					$display = true;
					break;
				}
		

				if ( false === $visibility ) {
					$display = false;
				}
			}

			if ( false === $display ) {
				return;
			}
		}

		return $block_content;
	}

	/**
	 * Adds the `otterConditions` attributes to all blocks, to avoid `Invalid parameter(s): attributes`
	 * error in Gutenberg.
	 *
	 * @since   1.7.0
	 * @access  public
	 */
	public function add_attributes_to_blocks() {
		$registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

		foreach ( $registered_blocks as $name => $block ) {
			$block->attributes['otterConditions'] = array(
				'type'    => 'array',
				'default' => array(),
			);
		}
	}

	/**
	 * Evaluate single condition
	 *
	 * @param array $condition condition.
	 *
	 * @return bool
	 */
	public function evaluate_condition( $condition ) {
		if ( ! isset( $condition['type'] ) ) {
			return true;
		}

		$visibility = isset( $condition['visibility'] ) ? boolval( $condition['visibility'] ) : true;

		if ( 'loggedInUser' === $condition['type'] ) {
			if ( is_user_logged_in() ) {
				return true;
			} else {
				return false;
			}
		}

		if ( 'loggedOutUser' === $condition['type'] ) {
			if ( is_user_logged_in() ) {
				return false;
			} else {
				return true;
			}
		}

		if ( 'userRoles' === $condition['type'] ) {
			if ( isset( $condition['roles'] ) ) {
				if ( $visibility ) {
					return $this->has_user_roles( $condition['roles'] );
				} else {
					return ! $this->has_user_roles( $condition['roles'] );
				}
			}
		}

		if ( 'postAuthor' === $condition['type'] ) {
			if ( isset( $condition['authors'] ) ) {
				if ( $visibility ) {
					return $this->has_author( $condition['authors'] );
				} else {
					return ! $this->has_author( $condition['authors'] );
				}
			}
		}

		if ( 'postMeta' === $condition['type'] ) {
			if ( isset( $condition['meta_key'] ) ) {
				if ( $visibility ) {
					return $this->has_meta( $condition );
				} else {
					return ! $this->has_meta( $condition );
				}
			}
		}

		if ( 'dateRange' === $condition['type'] ) {
			if ( isset( $condition['start_date'] ) ) {
				return $this->has_date_range( $condition );
			}
		}

		if ( 'dateRecurring' === $condition['type'] ) {
			if ( isset( $condition['days'] ) ) {
				return $this->has_date_recurring( $condition['days'] );
			}
		}

		if ( 'timeRecurring' === $condition['type'] ) {
			if ( isset( $condition['start_time'] ) ) {
				return $this->has_time_recurring( $condition );
			}
		}

		return true;
	}

	/**
	 * Check current user's role.
	 * 
	 * @param array $roles Selected user roles.
	 *
	 * @since  1.7.0
	 * @access public
	 */
	public function has_user_roles( $roles ) {
		$user = wp_get_current_user();

		$user_roles = (array) $user->roles;
	
		foreach ( (array) $roles as $role ) {
			if ( in_array( $role, $user_roles ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Check current user's role.
	 * 
	 * @param array $authors Selected user roles.
	 *
	 * @since  1.7.0
	 * @access public
	 */
	public function has_author( $authors ) {
		$id       = get_the_author_meta( 'ID' );
		$user     = get_user_by( 'id', $id );
		$username = $user->user_login;

		if ( in_array( $username, $authors ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Check meta compare.
	 * 
	 * @param array $condition Condition.
	 *
	 * @since  1.7.0
	 * @access public
	 */
	public function has_meta( $condition ) {
		if ( ! isset( $condition['meta_key'] ) || ! isset( $condition['meta_compare'] ) ) {
			return true;
		}

		$id   = get_the_ID();
		$meta = get_post_meta( $id, $condition['meta_key'], true );

		if ( 'is_true' === $condition['meta_compare'] ) {
			return true === boolval( $meta );
		}

		if ( 'is_false' === $condition['meta_compare'] ) {
			return false === boolval( $meta );
		}

		if ( 'is_empty' === $condition['meta_compare'] ) {
			return empty( $meta );
		}

		if ( 'if_equals' === $condition['meta_compare'] && isset( $condition['meta_value'] ) ) {
			return $meta === $condition['meta_value'];
		}

		if ( 'if_contains' === $condition['meta_compare'] && isset( $condition['meta_value'] ) ) {
			return false !== strpos( $meta, $condition['meta_value'] );
		}

		return false;
	}

	/**
	 * Check date range.
	 * 
	 * @param array $condition Condition.
	 *
	 * @since  1.7.0
	 * @access public
	 */
	public function has_date_range( $condition ) {
		if ( ! isset( $condition['start_date'] ) ) {
			return true;
		}

		$timezone     = $this->get_timezone();
		$start_date   = strtotime( $condition['start_date'] . $timezone );
		$current_time = time();
		$start_date   = $current_time > $start_date;
		$end_date     = true;

		if ( isset( $condition['end_date'] ) ) {
			$end_date = strtotime( $condition['end_date'] . $timezone );
			$end_date = $current_time < $end_date;
		}

		if ( $start_date && $end_date ) {
			return true;
		}

		return false;
	}

	/**
	 * Check recurring days.
	 * 
	 * @param array $days Days of Week.
	 *
	 * @since  1.7.0
	 * @access public
	 */
	public function has_date_recurring( $days ) {
		$time = current_time( 'l' );
		$day  = strtolower( $time );

		if ( ! in_array( $day, $days ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Check recurring days.
	 * 
	 * @param array $condition Condition.
	 *
	 * @since  1.7.0
	 * @access public
	 */
	public function has_time_recurring( $condition ) {
		if ( ! isset( $condition['start_time'] ) ) {
			return true;
		}

		$timezone     = $this->get_timezone();
		$start_time   = strtotime( $condition['start_time'] . $timezone );
		$current_time = time();
		$start_time   = $current_time > $start_time;
		$end_time     = true;

		if ( isset( $condition['end_time'] ) ) {
			$end_time = strtotime( $condition['end_time'] . $timezone );
			$end_time = $current_time < $end_time;
		}

		if ( $start_time && $end_time ) {
			return true;
		}

		return false;
	}


	/**
	 * Get WordPress timezone..
	 *
	 * @since  1.7.0
	 * @access public
	 */
	public function get_timezone() {
		$offset   = 60 * get_option( 'gmt_offset' );
		$sign     = $offset < 0 ? '-' : '+';
		$absmin   = abs( $offset );
		$timezone = sprintf( '%s%02d:%02d', $sign, $absmin / 60, $absmin % 60 );
		return $timezone;
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.7.0
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
	 * @since 1.7.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'otter-blocks' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access public
	 * @since 1.7.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'otter-blocks' ), '1.0.0' );
	}
}
