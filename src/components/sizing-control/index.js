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

const { Component } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

class SizingControl extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const id = `inspector-sizing-control-${ this.props.instanceId }`;

		if ( this.props.options && 1 > this.props.options.length ) {
			return __( 'Please specify more options.' );
		}

		return (
			<div
				id={ id }
				className="wp-block-themeisle-blocks-sizing-control"
			>
				<div className="components-base-control__field">
					{ this.props.label && (
						<label
							className="components-base-control__label"
							htmlFor={ id }
						>
							{ this.props.label }
						</label>
					) }

					<div
						className={ classnames(
							'wp-block-themeisle-blocks-sizing-control-wrapper',
							{ 'linking': this.props.type }
						) }
					>
						{ this.props.options.map( ( i, n ) => {
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
													id={ `wp-block-themeisle-blocks-sizing-control-item-input-${ n }` }
													value={ i.value }
													min={ this.props.min }
													max={ this.props.max }
													onFocus={ onToggle }
													onFocusOut={ onToggle }
													onChange={ e => this.props.onChange( i.type, e.target.value ) }
												/>
											) }
											renderContent={ ({ onToggle }) => (
												<div className="wp-block-themeisle-blocks-sizing-control-overlay">
													<RangeControl
														value={ i.value }
														initialPosition={ i.value }
														beforeIcon="minus"
														afterIcon="plus"
														min={ this.props.min }
														max={ this.props.max }
														onChange={ e => this.props.onChange( i.type, e ) }
													/>
												</div>
											) }
										/>
									)}

									{ i.label && (
										<label
											className="wp-block-themeisle-blocks-sizing-control-item-label"
											htmlFor={ `wp-block-themeisle-blocks-sizing-control-item-input-${ n }` }
										>
											{ i.label }
										</label>
									) }
								</div>
							);
						}) }

						{ this.props.type && (
							<div
								className={ classnames(
									'wp-block-themeisle-blocks-sizing-control-item',
									'toggle-linking',
									{ 'is-linked': 'linked' === this.props.type }
								) }
							>
								<IconButton
									icon={ 'linked' === this.props.type ? 'admin-links' : 'editor-unlink' }
									tooltip={ 'linked' === this.props.type ? __( 'Unlink Values' ) : __( 'Link Values' ) }
									className="wp-block-themeisle-blocks-sizing-control-item-input"
									onClick={ () => this.props.changeType( 'linked' === this.props.type ? 'unlinked' : 'linked' ) }
								/>
							</div>
						) }
					</div>
				</div>
			</div>
		);
	}
}

export default withInstanceId( SizingControl );
