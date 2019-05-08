/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	IconButton
} = wp.components;

const { withInstanceId } = wp.compose;

const { Component } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

class LinkControl extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			isOpen: false
		};
	}

	render() {
		const id = `inspector-link-control-${ this.props.instanceId }`;
		const onChangeValue = ( event ) => this.props.onChange( event.target.value );

		return (
			<BaseControl
				id={ id }
				label={ this.props.label }
				help={ this.props.help }
				className={ this.props.className }
			>
				<div
					className={ classnames(
						'wp-block-themeisle-blocks-link-control-wrapper',
						{ 'is-open': this.state.isOpen }
					) }
				>
					<input
						type="url"
						placeholder={ this.props.placeholder }
						value={ this.props.value }
						onChange={ onChangeValue }
						className={ classnames(
							'components-text-control__input',
							{ 'is-full': undefined === this.props.children }
						) }
					/>

					{ undefined !== this.props.children && (
						<IconButton
							icon="admin-generic"
							tooltip={ __( 'Link Options' ) }
							onClick={ () => this.setState({ isOpen: ! this.state.isOpen }) }
						/>
					) }
				</div>

				{ this.state.isOpen && this.props.children }
			</BaseControl>
		);
	}
}

export default withInstanceId( LinkControl );
