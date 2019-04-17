/**
 * External dependencies
 */
import { Chart } from 'react-google-charts';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

const {
	ExternalLink,
	FormToggle,
	Notice,
	PanelBody,
	PanelRow,
	TextControl
} = wp.components;

const { InspectorControls } = wp.editor;

class Editor extends Component {
	constructor() {
		super( ...arguments );

		this.changeChartTitle = this.changeChartTitle.bind( this );
		this.toggle3d = this.toggle3d.bind( this );

		if ( this.props.clientId && '' === this.props.attributes.id ) {
			const id = this.props.clientId;
			this.props.setAttributes({ id });
		}

		this.data = JSON.parse( this.props.attributes.data );
	}

	changeChartTitle( value ) {
		const options = { ...this.props.attributes.options };
		options.title = value;
		this.props.setAttributes({ options });
	}

	toggle3d() {
		const options = { ...this.props.attributes.options };
		options.is3D = ! this.props.attributes.options.is3D;
		this.props.setAttributes({ options });
	}

	render() {
		return (
			<Fragment>

				<InspectorControls>
					<PanelBody
						title={ __( 'Chart Settings' ) }
					>
						<TextControl
							label={ __( 'Chart Title' ) }
							value={ this.props.attributes.options.title }
							onChange={ this.changeChartTitle }
						/>
						<PanelRow>
							<label
								htmlFor="is-3d-form-toggle"
							>
								{ __( 'Is chart 3d?' ) }
							</label>
							<FormToggle
								id="is-3d-form-toggle"
								label={ __( 'Is chart 3rd? ' ) }
								checked={ this.props.attributes.options.is3D }
								onChange={ this.toggle3d }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div className={ this.props.className }>
					<Chart
						chartType="PieChart"
						data={ JSON.parse( this.props.attributes.data ) }
						options={ this.props.attributes.options }
						width="100%"
						height="400px"
						legendToggle
					/>
				</div>
				<Notice status="warning" isDismissible={ false }>{ __( 'We have deprecated Pie Chart Block and it will be removed soon. For advanced options and more charts, please install our Visualizer plugin:' ) } <ExternalLink href="http://wordpress.org/plugins/visualizer/">{ __( 'Visualizer: Tables and Charts Manager for WordPress' ) }</ExternalLink></Notice>
			</Fragment>
		);
	}
}

export default Editor;
