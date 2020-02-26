/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorAdvancedControls } = wp.blockEditor;

const { withInstanceId } = wp.compose;

const {
	BaseControl,
	IconButton,
	Notice
} = wp.components;

const { useState } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const HTMLAnchorControl = ({
	instanceId,
	value,
	onChange
}) => {
	const [ isEditing, setEditing ] = useState( false );
	const [ ID, setID ] = useState( value );

	const isInvalid = undefined !== window.themeisleGutenberg.blockIDs && value !== ID && window.themeisleGutenberg.blockIDs.includes( ID );

	return (
		<InspectorAdvancedControls>
			<BaseControl
				label={ __( 'HTML Anchor' ) }
				help={ __( 'Anchors lets you link directly to a section on a page.' ) }
				id={ `wp-block-themeisle-blocks-html-anchor-control-${ instanceId }` }
			>
				<div className="wp-block-themeisle-blocks-html-anchor-control">
					<input
						type="text"
						className="wp-block-themeisle-blocks-html-anchor-control-input"
						readonly={ isEditing ? false : 'readonly' }
						value={ isEditing ? ID : value }
						onChange={ e => setID( e.target.value ) }
						onClick={ e => e.target.select() }
					/>

					<IconButton
						icon={ isEditing ? 'yes' : 'edit' }
						tooltip={ isEditing ? __( 'Save' ) : __( 'Edit' ) }
						disabled={ isInvalid ? true : false }
						className={ classnames(
							'wp-block-themeisle-blocks-html-anchor-control-button',
							{ 'is-saved': ! isEditing }
						) }
						onClick={ () => {
							if ( isEditing && value !== ID ) {
								const index = window.themeisleGutenberg.blockIDs.findIndex( e => e === value );
								window.themeisleGutenberg.blockIDs[ index ] = ID;
								onChange( ID );
							}
							setEditing( ! isEditing );
						} }
					/>
				</div>
			</BaseControl>

			{ isInvalid && (
				<Notice
					status="warning"
					isDismissible={ false }
					className="wp-block-themeisle-blocks-anchor-control-notice"
				>
					{ __( 'This ID has already been used in this page. Please consider using a different ID to avoid conflict.' ) }
				</Notice>
			) }
		</InspectorAdvancedControls>
	);
};

export default withInstanceId( HTMLAnchorControl );
