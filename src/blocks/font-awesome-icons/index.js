/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	BaseControl,
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl,
	ToggleControl
} = wp.components;

const {
	compose,
	withState
} = wp.compose;

const { withSelect } = wp.data;

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	ContrastChecker,
	InspectorControls
} = wp.editor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

import { faIcon } from '../../helpers/icons.js';

import IconPickerControl from '../../components/icon-picker-control/index.js';

import LinkControl from '../../components/link-control/index.js';

import deprecated from './deprecated.js';

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
		id: {
			type: 'string'
		},
		align: {
			type: 'string'
		},
		prefix: {
			type: 'string',
			default: 'fab'
		},
		icon: {
			type: 'string',
			default: 'themeisle'
		},
		link: {
			type: 'string'
		},
		newTab: {
			type: 'boolean',
			default: false
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
		backgroundColorHover: {
			type: 'string'
		},
		textColorHover: {
			type: 'string'
		},
		borderColorHover: {
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

	deprecated: deprecated,

	edit: compose([

		withSelect( ( select, props ) => {
			return {
				props
			};
		}),

		withState({
			hover: false
		})

	])( ({ hover, setState, props }) => {

		if ( props.attributes.id === undefined || props.attributes.id.substr( props.attributes.id.length - 8 ) !== props.clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-font-awesome-icons-${ props.clientId.substr( 0, 8 ) }`;
			props.setAttributes({ id: instanceId });
		}

		const changeAlignment = value => {
			props.setAttributes({ align: value });
		};

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

		const changeLink = value => {
			props.setAttributes({ link: value });
		};

		const toggleNewTab = () => {
			props.setAttributes({ newTab: ! props.attributes.newTab });
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

		const changeBackgroundColorHover = value => {
			props.setAttributes({ backgroundColorHover: value });
		};

		const changeTextColorHover = value => {
			props.setAttributes({ textColorHover: value });
		};

		const changeBorderColorHover = value => {
			props.setAttributes({ borderColorHover: value });
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

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ props.attributes.align }
						onChange={ changeAlignment }
						alignmentControls={ [
							{
								icon: 'editor-alignleft',
								title: __( 'Align left' ),
								align: 'left'
							},
							{
								icon: 'editor-aligncenter',
								title: __( 'Align center' ),
								align: 'center'
							},
							{
								icon: 'editor-alignright',
								title: __( 'Align right' ),
								align: 'right'
							}
						] }
					/>
				</BlockControls>

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

						<LinkControl
							label={ __( 'Link' ) }
							placeholder="https://…"
							value={ props.attributes.link }
							onChange={ changeLink }
						>
							<ToggleControl
								label={ 'Open in New Tab?' }
								checked={ props.attributes.newTab }
								onChange={ toggleNewTab }
							/>
						</LinkControl>
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
							label={ __( 'Padding' ) }
							value={ props.attributes.padding || '' }
							initialPosition={ 5 }
							onChange={ changePadding }
							min={ 0 }
							max={ 100 }
							beforeIcon="minus"
							afterIcon="plus"
						/>

						<RangeControl
							label={ __( 'Margin' ) }
							value={ props.attributes.margin || '' }
							initialPosition={ 5 }
							onChange={ changeMargin }
							min={ 0 }
							max={ 100 }
							beforeIcon="minus"
							afterIcon="plus"
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Color' ) }
						initialOpen={ false }
					>
						<ButtonGroup className="wp-block-themeisle-blocks-font-awesome-icons-hover-control">
							<Button
								isDefault
								isLarge
								isPrimary={ ! hover }
								onClick={ () => setState({ hover: false }) }
							>
								{ __( 'Normal' ) }
							</Button>
							<Button
								isDefault
								isLarge
								isPrimary={ hover }
								onClick={ () => setState({ hover: true }) }
							>
								{ __( 'Hover' ) }
							</Button>
						</ButtonGroup>

						{ hover ? (
							<Fragment>
								<BaseControl
									label={ 'Hover Background' }
								>
									<ColorPalette
										label={ 'Hover Background' }
										value={ props.attributes.backgroundColorHover }
										onChange={ changeBackgroundColorHover }
									/>
								</BaseControl>

								<BaseControl
									label={ 'Hover Icon' }
								>
									<ColorPalette
										label={ 'Hover Icon' }
										value={ props.attributes.textColorHover }
										onChange={ changeTextColorHover }
									/>
								</BaseControl>

								<BaseControl
									label={ 'Hover Border' }
								>
									<ColorPalette
										label={ 'Hover Border' }
										value={ props.attributes.borderColorHover }
										onChange={ changeBorderColorHover }
									/>
								</BaseControl>

								<ContrastChecker
									{ ...{
										textColor: props.attributes.textColorHover,
										backgroundColor: props.attributes.backgroundColorHover
									} }
								/>
							</Fragment>
						) : (
							<Fragment>
								<BaseControl
									label={ 'Background' }
								>
									<ColorPalette
										label={ 'Background' }
										value={ props.attributes.backgroundColor }
										onChange={ changeBackgroundColor }
									/>
								</BaseControl>

								<BaseControl
									label={ 'Icon' }
								>
									<ColorPalette
										label={ 'Icon' }
										value={ props.attributes.textColor }
										onChange={ changeTextColor }
									/>
								</BaseControl>

								<BaseControl
									label={ 'Border' }
								>
									<ColorPalette
										label={ 'Border' }
										value={ props.attributes.borderColor }
										onChange={ changeBorderColor }
									/>
								</BaseControl>

								<ContrastChecker
									{ ...{
										textColor: props.attributes.textColor,
										backgroundColor: props.attributes.backgroundColor
									} }
								/>
							</Fragment>
						) }
					</PanelBody>

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
				</InspectorControls>

				<style>
					{ `#${ props.attributes.id } .${ props.className }-container:hover {
						color: ${ props.attributes.textColorHover ? props.attributes.textColorHover : props.attributes.textColor } !important;
						background: ${ props.attributes.backgroundColorHover ? props.attributes.backgroundColorHover : props.attributes.backgroundColor } !important;
						border-color: ${ props.attributes.borderColorHover ? props.attributes.borderColorHover : props.attributes.borderColor } !important;
					}` }
				</style>

				<p
					className={ props.className }
					id={ props.attributes.id }
					style={{ textAlign: props.attributes.align }}
				>
					<span
						className="wp-block-themeisle-blocks-font-awesome-icons-container"
						style={ containerStyle }
					>
						<i
							className={ `${ props.attributes.prefix } fa-${ props.attributes.icon }` }
							style={ iconStyle }
						>
						</i>
					</span>
				</p>
			</Fragment>
		);
	}),

	save: props => {
		const containerStyle = {
			borderRadius: props.attributes.borderRadius + '%',
			borderStyle: 'solid',
			borderWidth: props.attributes.borderSize + 'px',
			display: 'inline-block',
			margin: props.attributes.margin + 'px'
		};

		const iconStyle = {
			borderRadius: props.attributes.borderRadius + '%',
			fontSize: props.attributes.fontSize + 'px',
			padding: props.attributes.padding + 'px'
		};

		const IconElement = () => {
			return (
				<i
					className={ `${ props.attributes.prefix } fa-${ props.attributes.icon }` }
					style={ iconStyle }
				>
				</i>
			);
		};

		return (
			<p
				className={ props.className }
				id={ props.attributes.id }
				style={{ textAlign: props.attributes.align }}
			>
				<span
					className="wp-block-themeisle-blocks-font-awesome-icons-container"
					style={ containerStyle }
				>
					{ ( props.attributes.link ) ? (
						<a
							href={ props.attributes.link }
							target={ props.attributes.newTab ? '_blank' : '_self' }
							style={{
								color: props.attributes.textColor
							}}
							rel="noopener noreferrer"
						>
							<IconElement />
						</a>
					) : (
						<IconElement />
					) }
				</span>
			</p>
		);
	}
});
