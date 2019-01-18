/**
 * External dependencies
 */
import { Chart } from 'react-google-charts';

import { HotTable } from '@handsontable/react';

import 'handsontable/dist/handsontable.full.css';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

const {
	Button,
	Dashicon,
	FormToggle,
	PanelBody,
	PanelRow,
	TextControl,
	Toolbar,
	Tooltip
} = wp.components;

const {
	BlockControls,
	InspectorControls
} = wp.editor;

class Editor extends Component {
	constructor() {
		super( ...arguments );

		this.changeChartTitle = this.changeChartTitle.bind( this );
		this.toggle3d = this.toggle3d.bind( this );
		this.saveChart = this.saveChart.bind( this );

		if ( this.props.clientId && '' === this.props.attributes.id ) {
			const id = this.props.clientId;
			this.props.setAttributes({ id });
		}

		this.state = {
			isOpen: false
		};

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

	saveChart() {
		this.props.setAttributes({ data: JSON.stringify( this.data ) });
		this.setState({ isOpen: ! this.state.isOpen });
	}

	render() {
		return (
			<Fragment>
				<BlockControls key="toolbar-controls">
					<Toolbar
						className='components-toolbar'
					>
						<Tooltip text={ this.state.isOpen ? __( 'Save' ) : __( 'Edit Chart' ) }>
							<Button
								className="components-icon-button components-toolbar__control edit-pie-chart"
								onClick={ this.saveChart }
							>
								<Dashicon icon={ this.state.isOpen ? 'yes' : 'edit' } />
							</Button>
						</Tooltip>
					</Toolbar>
				</BlockControls>

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
					{ this.state.isOpen ?
						<HotTable
							data={ this.data }
							allowInsertRow={ true }
							cell={ [
								{
									row: 0,
									col: 0,
									readOnly: true
								},
								{
									row: 0,
									col: 1,
									readOnly: true
								}
							] }
							columns={ [
								{
									type: 'text'
								},
								{
									type: 'numeric'
								}
							] }
							contextMenu={ true }
							className="htLeft"
							height="200"
							rowHeaders={ true }
							stretchH="all"
						/>					:
						<Chart
							chartType="PieChart"
							data={ JSON.parse( this.props.attributes.data ) }
							options={ this.props.attributes.options }
							width="100%"
							height="400px"
							legendToggle
						/>
					}
				</div>
			</Fragment>
		);
	}
}

export default Editor;
