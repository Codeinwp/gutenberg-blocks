/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { withInstanceId } = wp.compose;

const {
	Button,
	BaseControl,
	Dropdown,
	MenuGroup,
	MenuItem,
	TextControl
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

import data from './icons.json';

class IconPickerControl extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			search: '',
			icons: null
		};
	}

	componentDidMount() {
		let icons = [];

		Object.keys( data ).forEach( i => {
			Object.keys( data[i].styles ).forEach( o => {
				let prefix = '';
				let terms = data[i].search.terms;

				switch ( data[i].styles[o]) {
				case 'brands':
					prefix = 'fab';
					break;
				case 'solid':
					prefix = 'fas';
					break;
				case 'regular':
					prefix = 'far';
					break;
				default:
					prefix = 'fas';
				}

				terms.push(
					i,
					data[i].label
				);

				icons.push({
					name: i,
					unicode: data[i].unicode,
					prefix: prefix,
					label: data[i].label,
					search: terms
				});
			});
		});

		this.setState({ icons });
	}

	render() {
		const id = `inspector-icon-picker-control-${ this.props.instanceId }`;
		return (
			<BaseControl
				label={ this.props.label }
				id={ id }
				className="wp-block-themeisle-blocks-icon-picker-control"
			>
				<Dropdown
					contentClassName="wp-block-themeisle-blocks-icon-picker-popover"
					position="bottom center"
					renderToggle={ ({ isOpen, onToggle }) => (
						<Button
							isLarge
							className="wp-block-themeisle-blocks-icon-picker-button"
							onClick={ onToggle }
							aria-expanded={ isOpen }
						>
							{ ( this.props.prefix && this.props.icon ) ?
								<Fragment>
									<i
										className={ classnames(
											this.props.prefix,
											`fa-${ this.props.icon }`,
											'fa-fw'
										) }
									>
									</i>
									{ this.props.icon }
								</Fragment> : __( 'Select Icon' )
							}
						</Button>
					) }
					renderContent={ ({ onToggle }) => (
						<MenuGroup label={ __( 'Font Awesome Icons' ) }>
							<TextControl
								value={ this.state.search }
								onChange={ e => this.setState({ search: e }) }
							/>

							<div className="components-popover__items">
								{ ( this.state.icons ).map( i => {
									if ( ! this.state.search || i.search.some( o => o.toLowerCase().match( this.state.search.toLowerCase() ) ) ) {
										return (
											<MenuItem
												label={ i.label }
												className={ classnames(
													{ 'is-selected': ( i.name === this.props.icon && i.prefix === this.props.prefix ) }
												) }
												onClick={ () => {
													onToggle();
													this.props.onChange({
														name: i.name,
														prefix: i.prefix
													});
												}}
											>
												<i
													className={ classnames(
														i.prefix,
														`fa-${ i.name }`,
														'fa-fw'
													) }
												>
												</i>
												{ i.name }
											</MenuItem>
										);
									}
								}) }
							</div>
						</MenuGroup>
					) }
				/>
			</BaseControl>
		);
	}
}

export default withInstanceId( IconPickerControl );
