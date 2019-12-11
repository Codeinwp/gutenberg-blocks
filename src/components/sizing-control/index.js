/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Dropdown,
	IconButton,
	RangeControl
} = wp.components;

const { withInstanceId } = wp.compose;

const { useState } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const SizingControl = ({
	instanceId,
	label,
	type,
	min,
	max,
	changeType,
	options,
	onChange
}) => {
	const id = `inspector-sizing-control-${ instanceId }`;

	if ( options && 1 > options.length ) {
		return __( 'Please specify more options.' );
	}

	return (
		<div
			id={ id }
			className="wp-block-themeisle-blocks-sizing-control"
		>
			<div className="components-base-control__field">
				{ label && (
					<label
						className="components-base-control__label"
						htmlFor={ id }
					>
						{ label }
					</label>
				) }

				<div
					className={ classnames(
						'wp-block-themeisle-blocks-sizing-control-wrapper',
						{ 'linking': type }
					) }
				>
					{ options.map( ( i, n ) => {
						return (
							<div className="wp-block-themeisle-blocks-sizing-control-item">
								{ i.disabled ? (
									<input
										type="number"
										disabled={ i.disabled }
										className="wp-block-themeisle-blocks-sizing-control-item-input"
										id={ `wp-block-themeisle-blocks-sizing-control-item-input-${ n }` }
									/>
								) : (
									<Dropdown
										position="top center"
										focusOnMount={ false }
										renderToggle={ ({ isOpen, onToggle }) => (
											<input
												type="number"
												className="wp-block-themeisle-blocks-sizing-control-item-input"
												id={ `wp-block-themeisle-blocks-sizing-control-item-input-${ n }-${ instanceId }` }
												value={ i.value }
												min={ min }
												max={ max }
												onFocus={ onToggle }
												onChange={ e => onChange( i.type, parseInt( e.target.value ) ) }
											/>
										) }
										renderContent={ ({ onToggle }) => (
											<div className="wp-block-themeisle-blocks-sizing-control-overlay">
												<RangeControl
													value={ i.value }
													initialPosition={ i.value }
													beforeIcon="minus"
													afterIcon="plus"
													min={ min }
													max={ max }
													onChange={ e => onChange( i.type, e ) }
												/>
											</div>
										) }
									/>
								) }

								{ i.label && (
									<label
										className="wp-block-themeisle-blocks-sizing-control-item-label"
										htmlFor={ `wp-block-themeisle-blocks-sizing-control-item-input-${ n }-${ instanceId }` }
									>
										{ i.label }
									</label>
								) }
							</div>
						);
					}) }

					{ type && (
						<div
							className={ classnames(
								'wp-block-themeisle-blocks-sizing-control-item',
								'toggle-linking',
								{ 'is-linked': 'linked' === type }
							) }
						>
							<IconButton
								icon={ 'linked' === type ? 'admin-links' : 'editor-unlink' }
								tooltip={ 'linked' === type ? __( 'Unlink Values' ) : __( 'Link Values' ) }
								className="wp-block-themeisle-blocks-sizing-control-item-input"
								onClick={ () => changeType( 'linked' === type ? 'unlinked' : 'linked' ) }
							/>
						</div>
					) }
				</div>
			</div>
		</div>
	);
};

export default withInstanceId( SizingControl );
