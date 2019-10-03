/**
 * External dependencies
 */
import classnames from 'classnames';

import {
	SortableContainer,
	SortableElement,
	SortableHandle
} from 'react-sortable-hoc';

/**
 * WordPress dependencies
 */
const {
	startCase,
	toLower
} = lodash;

const { __ } = wp.i18n;

const {
	IconButton,
	TextControl,
	SelectControl,
	ToggleControl
} = wp.components;

const { withState } = wp.compose;

const { Fragment } = wp.element;

const DragHandle = SortableHandle( () => {
	return (
		<div className="wp-block-themeisle-blocks-posts-grid-builder-handle">
			<span></span>
		</div>
	);
});

const SortableItemArea = ({ value, disabled, getFields, toggleFields, isOpen, setState, imageSize, excerptLimit }) => {
	const label = startCase( toLower( value ) );
	let icon = 'hidden';
	let message = __( `Display ${ label }` );

	if ( getFields( value ) ) {
		icon = 'visibility';
		message = __( `Hide ${ label }` );
	}

	let edit;

	switch ( value ) {
	case 'image':
		edit = true;
		break;
	case 'meta':
		edit = true;
		break;
	case 'description':
		edit = true;
		break;
	default:
		edit = false;
		break;
	}

	return (
		<div
			className={ classnames(
				'wp-block-themeisle-blocks-posts-grid-builder-item-area',
				`wp-block-themeisle-blocks-posts-grid-builder-item-area-${ value }`
			) }
		>
			<div
				className={ classnames(
					'wp-block-themeisle-blocks-posts-grid-builder-item',
					{
						'disabled': disabled,
						'hidden': ! getFields( value ),
						'editable': edit
					}
				) }
			>
				{ ! disabled && <DragHandle /> }

				<div className="wp-block-themeisle-blocks-posts-grid-builder-label">
					{ label }
				</div>

				{ edit && (
					<IconButton
						icon={ isOpen ? 'arrow-up-alt2' : 'arrow-down-alt2' }
						label={ isOpen ? __( 'Close Settings' ) : __( 'Open Settings' ) }
						className="wp-block-themeisle-blocks-posts-grid-builder-button"
						onClick={ () => setState({ isOpen: ! isOpen }) }
					/>
				) }

				<IconButton
					icon={ icon }
					label={ message }
					className="wp-block-themeisle-blocks-posts-grid-builder-button"
					onClick={ () => {
						toggleFields( value );
						setState({ isOpen: false });
					} }
				/>
			</div>

			{ edit && (
				<div
					className={ classnames(
						'wp-block-themeisle-blocks-posts-grid-builder-control-area',
						{ 'opened': isOpen && getFields( value ) }
					) }
				>
					{ ( 'image' === value ) && (
						<SelectControl
							label={ __( 'Image Size' ) }
							value={ imageSize.value }
							options={ [
								{ label: __( 'Thumbnail' ), value: 'thumbnail' },
								{ label: __( 'Medium' ), value: 'medium' },
								{ label: __( 'Medium Large' ), value: 'medium_large' },
								{ label: __( 'Large' ), value: 'large' },
								{ label: __( 'Full' ), value: 'full' }
							] }
							onChange={ imageSize.onChange }
						/>
					) }

					{ ( 'description' === value ) && (
						<TextControl
							label={ __( 'Excerpt Limit' ) }
							type="number"
							value={ excerptLimit.value }
							onChange={ excerptLimit.onChange }
						/>
					) }

					{ ( 'meta' === value ) && (
						<Fragment>
							<ToggleControl
								label={ 'Display Date?' }
								checked={ getFields( 'date' ) }
								onChange={ () => toggleFields( 'date' ) }
							/>

							<ToggleControl
								label={ 'Display Author?' }
								checked={ getFields( 'author' ) }
								onChange={ () => toggleFields( 'author' ) }
							/>
						</Fragment>
					) }
				</div>
			) }
		</div>
	);
};

const SortableItemContainer = SortableElement( ({ value, disabled, getFields, toggleFields, excerptLimit }) => {
	return (
		<SortableItem
			value={ value }
			disabled={ disabled }
			getFields={ getFields }
			toggleFields={ toggleFields }
			excerptLimit={ excerptLimit }
		/>
	);
});

export const SortableItem = withState({
	isOpen: false
})( SortableItemArea );

export const SortableList = SortableContainer( ({ template, getFields, toggleFields, excerptLimit }) => {
	return (
		<div>
			{ template.map( ( value, index ) => (
				<SortableItemContainer
					key={`item-${ index }`}
					index={ index }
					value={ value }
					getFields={ getFields }
					toggleFields={ toggleFields }
					excerptLimit={ excerptLimit }
				/>
			) ) }
		</div>
	);
});
