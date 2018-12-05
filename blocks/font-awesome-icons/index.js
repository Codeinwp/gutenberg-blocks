/**
 * External dependencies...
 */
import classnames from 'classnames';

import Autosuggest from 'react-autosuggest';

/**
 * WordPress dependencies...
 */

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	PanelBody,
	Spinner,
	Placeholder,
	RangeControl
} = wp.components;

const {
	compose,
	withState
} = wp.compose;

const { withSelect } = wp.data;

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

registerBlockType( 'themeisle-blocks/font-awesome-icons', {
	title: __( 'Font Awesome Icons' ),
	description: __( 'Share buttons for your website visitors to share content on any social sharing service.' ),
	icon: 'smiley',
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

	edit: compose([

		withSelect( ( select, props ) => {
			const iconsList = select( 'themeisle-gutenberg/blocks' ).getFaIconsList();
			return {
				iconsList,
				props
			};
		}),

		withState({
			suggestions: []
		})

	])( ({ iconsList, suggestions, setState, props }) => {

		const getSuggestions = value => {
			const inputValue = value.trim().toLowerCase();
			const inputLength = inputValue.length;

			return 0 === inputLength ? [] : iconsList.filter( icon =>
				icon.name.toLowerCase().slice( 0, inputLength ) === inputValue
			);
		};

		const getSuggestionValue = suggestion => suggestion;

		const renderSuggestion = suggestion => {
			return (
				<div
					className={ classnames(
						'icon-select',
						{ 'selected': ( suggestion.name === props.attributes.icon && suggestion.prefix === props.attributes.prefix ) },
					) }
				>
					<i className={ `${ suggestion.prefix } fa-fw fa-${ suggestion.name }` }></i>
					{ suggestion.name }
				</div>
			);
		};

		const renderSuggestionsContainer = ({ containerProps, children, query }) => {
			return (
				<div { ... containerProps }>
					{ children }
				</div>
			);
		};

		const onSuggestionsFetchRequested = ({ value }) => {
			setState({
				suggestions: getSuggestions( value )
			});
		};

		const onSuggestionsClearRequested = () => {
			setState({
				suggestions: []
			});
		};

		const inputProps = {
			placeholder: __( 'Start typing, like themeisle…' ),
			value: props.attributes.icon,
			onChange: ( event, { newValue }) => {
				if ( 'object' === typeof newValue ) {
					props.setAttributes({
						icon: newValue.name,
						prefix: newValue.prefix
					});
				} else {
					props.setAttributes({ icon: newValue });
				}
			}
		};

		const changeFontSize = ( value ) => {
			props.setAttributes({ fontSize: value });
		};

		const changePadding = ( value ) => {
			props.setAttributes({ padding: value });
		};

		const changeMargin = ( value ) => {
			props.setAttributes({ margin: value });
		};

		const changeBackgroundColor = ( value ) => {
			props.setAttributes({ backgroundColor: value });
		};

		const changeTextColor = ( value ) => {
			props.setAttributes({ textColor: value });
		};

		const changeBorderColor = ( value ) => {
			props.setAttributes({ borderColor: value });
		};

		const changeBorderSize = ( value ) => {
			props.setAttributes({ borderSize: value });
		};

		const changeBorderRadius = ( value ) => {
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
					{ iconsList !== undefined && 0 < iconsList.length ?
						<div
							className="font-awesome-auto-complete"
						>
							<label>
								<i className={ `${ props.attributes.prefix } fa-${ props.attributes.icon }` }></i>
							</label>
							<Autosuggest
								suggestions={ suggestions }
								onSuggestionsFetchRequested={ onSuggestionsFetchRequested }
								onSuggestionsClearRequested={ onSuggestionsClearRequested }
								getSuggestionValue={ getSuggestionValue }
								renderSuggestion={ renderSuggestion }
								renderSuggestionsContainer={ renderSuggestionsContainer }
								inputProps={ inputProps }
							/>
						</div>				:
						<Placeholder>
							<Spinner />
						</Placeholder>
					}
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
	}),

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
			<p>
				<span style={ containerStyle } >
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
