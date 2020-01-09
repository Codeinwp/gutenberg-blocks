/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	Dropdown,
	IconButton,
	RangeControl,
	Toolbar
} = wp.components;

const {
	AlignmentToolbar,
	BlockControls
} = wp.blockEditor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import GoogleFontsControl from '../../components/google-fonts-control/index.js';

const Controls = ({
	attributes,
	setAttributes,
	changeFontSize,
	changeFontFamily,
	changeFontVariant,
	changeFontStyle,
	changeTextTransform,
	changeLineHeight
}) => {
	const changeAlignment = value => {
		setAttributes({ align: value });
	};

	return (
		<BlockControls>
			<AlignmentToolbar
				value={ attributes.align }
				onChange={ changeAlignment }
				alignmentControls={ [
					{
						icon: 'editor-alignleft',
						title: __( 'Align left' ),
						align: 'flex-start'
					},
					{
						icon: 'editor-aligncenter',
						title: __( 'Align center' ),
						align: 'center'
					},
					{
						icon: 'editor-alignright',
						title: __( 'Align right' ),
						align: 'flex-end'
					}
				] }
			/>

			<Toolbar
				className="wp-themesiel-blocks-button-group-components-toolbar"
			>
				<Dropdown
					contentClassName="wp-themesiel-blocks-button-group-popover-content"
					position="bottom center"
					renderToggle={ ({ isOpen, onToggle }) => (
						<IconButton
							className="components-dropdown-menu__toggle"
							icon={ 'editor-textcolor' }
							onClick={ onToggle }
							aria-haspopup="true"
							aria-expanded={ isOpen }
							label={ __( 'Typography Settings' ) }
							tooltip={ __( 'Typography Settings' ) }
						>
							<span className="components-dropdown-menu__indicator" />
						</IconButton>
					) }
					renderContent={ () => (
						<Fragment>
							<RangeControl
								label={ __( 'Font Size' ) }
								value={ attributes.fontSize }
								onChange={ changeFontSize }
								min={ 0 }
								max={ 50 }
							/>

							<GoogleFontsControl
								label={ __( 'Font Family' ) }
								value={ attributes.fontFamily }
								onChangeFontFamily={ changeFontFamily }
								isSelect={ true }
								valueVariant={ attributes.fontVariant }
								onChangeFontVariant={ changeFontVariant }
								valueStyle={ attributes.fontStyle }
								onChangeFontStyle={ changeFontStyle }
								valueTransform={ attributes.textTransform }
								onChangeTextTransform={ changeTextTransform }
							/>

							<RangeControl
								label={ __( 'Line Height' ) }
								value={ attributes.lineHeight }
								onChange={ changeLineHeight }
								min={ 0 }
								max={ 200 }
							/>
						</Fragment>
					) }
				/>
			</Toolbar>
		</BlockControls>
	);
};

export default Controls;
