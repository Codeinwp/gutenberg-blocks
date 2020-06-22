/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorAdvancedControls } = wp.blockEditor;

const { useInstanceId } = wp.compose;

const {
	BaseControl,
	Button,
	Notice
} = wp.components;

const {
	useEffect,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const HTMLAnchorControl = ({
	value,
	onChange
}) => {
	const instanceId = useInstanceId( HTMLAnchorControl );

	useEffect( () => setID( value ), [ value ]);

	const [ isEditing, setEditing ] = useState( false );
	const [ ID, setID ] = useState( null );

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

					<Button
						icon={ isEditing ? 'yes' : 'edit' }
						label={ isEditing ? __( 'Save' ) : __( 'Edit' ) }
						showTooltip={ true }
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

export default HTMLAnchorControl;
