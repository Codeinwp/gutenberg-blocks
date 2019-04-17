<?php
namespace ThemeIsle\GutenbergBlocks;

/**
 * Class Chart_Pie_Block
 */
class Chart_Pie_Block extends Base_Block {

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
		$this->block_slug = 'chart-pie';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	function set_attributes() {
		$this->attributes = array(
			'data' => array(
				'type'    => 'string',
				'default' => '[["Label","Data"],["Dogs",40],["Cats",30],["Racoons",20],["Monkeys",10]]',
			),
			'options' => array(
				'type' => 'object',
				'default' => [
					'title' => __( 'Animals', 'textdomain' ),
					'is3D' => true,
				],
			),
			'id' => array(
				'type' => 'string',
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
		$chart_markup = "<div class='wp-block-themeisle-blocks-chart-pie' id='" . $attributes['id'] . "' style='width: 100%; min-height: 450px;'></div>";

		$script = "<script>
			google.charts.load('current', {'packages':['corechart'] });
			google.charts.setOnLoadCallback(drawChart);
	
			function drawChart() {
				var data = google.visualization.arrayToDataTable(" . $attributes['data'] . ');
				var options = ' . json_encode( $attributes['options'] ) . ";
				var chart = new google.visualization.PieChart(document.getElementById('" . $attributes['id'] . "'));
				chart.draw(data, options);
			}
		</script>";

		return $chart_markup . $script;
	}
}
