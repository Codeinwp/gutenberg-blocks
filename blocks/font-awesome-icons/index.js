/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	PanelBody,
	RangeControl
} = wp.components;

const {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

import { faIcon } from '../../utils/icons.js';

import IconPickerControl from '../../components/icon-picker-control/index.js';

registerBlockType( 'themeisle-blocks/font-awesome-icons', {
	title: __( 'Font Awesome Icons' ),
	description: __( 'Share buttons for your website visitors to share content on any social sharing service.' ),
	icon: faIcon,
	category: 'themeisle-blocks',
	keywords: [
		'font awesome',
		'dashicons',
		'icons'
	],
	attributes: {
		prefix: {
			type: 'string',
			default: 'fab'
		},
		icon: {
			type: 'string',
			default: 'themeisle'
		},
		fontSize: {
			type: 'number',
			default: 16
		},
		padding: {
			type: 'number',
			default: 5
		},
		margin: {
			type: 'number',
			default: 5
		},
		backgroundColor: {
			type: 'string'
		},
		textColor: {
			type: 'string'
		},
		borderColor: {
			type: 'string'
		},
		borderSize: {
			type: 'number',
			default: 0
		},
		borderRadius: {
			type: 'number',
			default: 0
		}
	},

	supports: {
		align: [ 'left', 'center', 'right' ]
	},

	edit: props => {

		const changeIcon = value => {
			if ( 'object' === typeof value ) {
				props.setAttributes({
					icon: value.name,
					prefix: value.prefix
				});
			} else {
				props.setAttributes({ icon: value });
			}
		};

		const changeFontSize = value => {
			props.setAttributes({ fontSize: value });
		};

		const changePadding = value => {
			props.setAttributes({ padding: value });
		};

		const changeMargin = value => {
			props.setAttributes({ margin: value });
		};

		const changeBackgroundColor = value => {
			props.setAttributes({ backgroundColor: value });
		};

		const changeTextColor = value => {
			props.setAttributes({ textColor: value });
		};

		const changeBorderColor = value => {
			props.setAttributes({ borderColor: value });
		};

		const changeBorderSize = value => {
			props.setAttributes({ borderSize: value });
		};

		const changeBorderRadius = value => {
			props.setAttributes({ borderRadius: value });
		};

		const iconStyle = {
			borderRadius: props.attributes.borderRadius + '%',
			fontSize: props.attributes.fontSize + 'px',
			padding: props.attributes.padding + 'px'
		};

		const containerStyle = {
			color: props.attributes.textColor,
			backgroundColor: props.attributes.backgroundColor,
			borderColor: props.attributes.borderColor,
			borderRadius: props.attributes.borderRadius + '%',
			borderStyle: 'solid',
			borderWidth: props.attributes.borderSize + 'px',
			display: 'inline-block',
			margin: props.attributes.margin + 'px'
		};

		return [
			<InspectorControls>
				<PanelBody
					title={ __( 'Icon Settings' ) }
				>
					<IconPickerControl
						label={ __( 'Icon Picker' ) }
						prefix={ props.attributes.prefix }
						icon={ props.attributes.icon }
						onChange={ changeIcon }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Icon Sizes' ) }
					className="blocks-font-size"
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Text Size' ) }
						value={ props.attributes.fontSize || '' }
						initialPosition={ 16 }
						onChange={ changeFontSize }
						min={ 12 }
						max={ 140 }
						beforeIcon="editor-textcolor"
						afterIcon="editor-textcolor"
					/>
					<RangeControl
						label={ __( 'Inner Space' ) }
						value={ props.attributes.padding || '' }
						initialPosition={ 5 }
						onChange={ changePadding }
						min={ 0 }
						max={ 100 }
						beforeIcon="minus"
						afterIcon="plus"
					/>
					<RangeControl
						label={ __( 'Outer Space' ) }
						value={ props.attributes.margin || '' }
						initialPosition={ 5 }
						onChange={ changeMargin }
						min={ 0 }
						max={ 100 }
						beforeIcon="minus"
						afterIcon="plus"
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: props.attributes.backgroundColor,
							onChange: changeBackgroundColor,
							label: __( 'Background Color' )
						},
						{
							value: props.attributes.textColor,
							onChange: changeTextColor,
							label: __( 'Text Color' )
						},
						{
							value: props.attributes.borderColor,
							onChange: changeBorderColor,
							label: __( 'Border Color' )
						}
					] }
				>
					<ContrastChecker
						{ ...{
							textColor: props.attributes.textColor,
							backgroundColor: props.attributes.backgroundColor
						} }
					/>
				</PanelColorSettings>
				<PanelBody
					title={ __( 'Border Settings' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Border Size' ) }
						value={ props.attributes.borderSize }
						onChange={ changeBorderSize }
						min={ 0 }
						max={ 120 }
						beforeIcon="minus"
						afterIcon="plus"
					/>
					<RangeControl
						label={ __( 'Border Radius' ) }
						value={ props.attributes.borderRadius }
						onChange={ changeBorderRadius }
						min={ 0 }
						max={ 100 }
						beforeIcon="grid-view"
						afterIcon="marker"
					/>
				</PanelBody>
			</InspectorControls>,

			<p className={ props.className } >
				<span
					className={ `${ props.className }-container` }
					style={ containerStyle }
				>
					<i
						className={ `${ props.attributes.prefix } fa-${ props.attributes.icon }` }
						style={ iconStyle }
					>
					</i>
				</span>
			</p>
		];
	},

	save: props => {
		const iconStyle = {
			borderRadius: props.attributes.borderRadius + '%',
			fontSize: props.attributes.fontSize + 'px',
			padding: props.attributes.padding + 'px'
		};

		const containerStyle = {
			color: props.attributes.textColor,
			backgroundColor: props.attributes.backgroundColor,
			borderColor: props.attributes.borderColor,
			borderRadius: props.attributes.borderRadius + '%',
			borderStyle: 'solid',
			borderWidth: props.attributes.borderSize + 'px',
			display: 'inline-block',
			margin: props.attributes.margin + 'px'
		};

		return (
			<p className={ props.className } >
				<span
					className={ `${ props.className }-container` }
					style={ containerStyle }
				>
					<i
						className={ `${ props.attributes.prefix } fa-${ props.attributes.icon }` }
						style={ iconStyle }
					>
					</i>
				</span>
			</p>
		);
	}
});
