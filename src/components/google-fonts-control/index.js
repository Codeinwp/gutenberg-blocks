/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const {
	startCase,
	toLower
} = lodash;

const { __ } = wp.i18n;

const { withInstanceId } = wp.compose;

const {
	Button,
	BaseControl,
	Dropdown,
	MenuGroup,
	MenuItem,
	SelectControl,
	TextControl
} = wp.components;

const { Component } = wp.element;

/**
* Internal dependencies
*/
import './editor.scss';

class GoogleFontsControl extends Component {
	constructor() {
		super( ...arguments );
		this.search = React.createRef();

		this.state = {
			fonts: null,
			font: [],
			variants: null,
			search: ''
		};
	}

	async componentDidMount() {
		await fetch( 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyClGdkPJ1BvgLOol5JAkQY4Mv2lkLYu00k' )
			.then( blob => blob.json() )
			.then( data => {
				this.setState({ fonts: data.items });
				if ( this.props.value ) {
					data.items.find( i => {
						if ( this.props.value === i.family ) {
							const variants = ( i.variants )
								.filter( o => false === o.includes( 'italic' ) )
								.map( o => {
									return o = {
										'label': startCase( toLower( o ) ),
										'value': o
									};
								});
							return this.setState({ variants });
						}
					});
				}
			});
	}

	render() {
		const id = `inspector-google-fonts-control-${ this.props.instanceId }`;
		return (
			<div className="wp-block-themeisle-blocks-google-fonts-control" >
				<BaseControl
					label={ this.props.label }
					id={ id }
				>
					{( null !== this.state.fonts ) ? (
						( this.props.isSelect ) ? (
							<SelectControl
								value={ this.props.value || '' }
								id={ id }
								options={ [
									{
										label: __( 'Default' ),
										value: ''
									},
									...this.state.fonts.map( i => {
										return i = {
											label: i.family,
											value: i.family
										};
									})
								] }
								onChange={ e => {
									this.props.onChangeFontFamily( e );
									this.props.onChangeFontVariant( 'regular' );

									const font = this.state.fonts.find( i => e === i.family );

									const variants = ( font.variants )
										.filter( o => false === o.includes( 'italic' ) )
										.map( o => {
											return o = {
												'label': startCase( toLower( o ) ),
												'value': o
											};
										});

									this.setState({
										font,
										variants
									});
								} }
							/>
						) : (
							<Dropdown
								contentClassName="wp-block-themeisle-blocks-google-fonts-popover"
								position="bottom center"
								renderToggle={ ({ isOpen, onToggle }) => (
									<Button
										isLarge
										className="wp-block-themeisle-blocks-google-fonts-button"
										id={ id }
										onClick={ onToggle }
										aria-expanded={ isOpen }
									>
										{ this.props.value ? this.props.value : __( 'Select Font Family' ) }
									</Button>
								) }
								renderContent={ ({ onToggle }) => (
									<MenuGroup label={ __( 'Google Fonts' ) }>
										<TextControl
											value={ this.state.search }
											onChange={ e => this.setState({ search: e }) }
										/>

										<div className="components-popover__items">
											<MenuItem
												onClick={ () => {
													onToggle();
													this.props.onChangeFontFamily( '' );
													this.setState({
														font: [],
														variants: [],
														search: ''
													});
												}}
											>
												{ __( 'Default' ) }
											</MenuItem>
											{ ( this.state.fonts ).map( i => {
												if ( ! this.state.search || i.family.toLowerCase().includes( this.state.search.toLowerCase() ) ) {
													return (
														<MenuItem
															className={ classnames(
																{ 'is-selected': ( i.family === this.props.value ) }
															) }
															onClick={ () => {
																onToggle();
																this.props.onChangeFontFamily( i.family );
																this.props.onChangeFontVariant( 'regular' );

																const variants = ( i.variants )
																	.filter( o => false === o.includes( 'italic' ) )
																	.map( o => {
																		return o = {
																			'label': startCase( toLower( o ) ),
																			'value': o
																		};
																	});

																this.setState({
																	font: i,
																	variants,
																	search: ''
																});
															}}
														>
															{ i.family }
														</MenuItem>
													);
												}
											}) }
										</div>
									</MenuGroup>
								) }
							/>
						)
					) : (
						__( 'Loading…' )
					) }
				</BaseControl>

				{ this.state.variants && (
					<SelectControl
						label={ __( 'Font Width' ) }
						value={ this.props.valueVariant || 'regular' }
						options={ this.state.variants }
						onChange={ this.props.onChangeFontVariant }
					/>
				) }

				<SelectControl
					label={ __( 'Font Style' ) }
					value={ this.props.valueStyle }
					options={ [
						{
							label: __( 'Regular' ),
							value: 'normal'
						},
						{
							label: __( 'Italic' ),
							value: 'italic'
						}
					] }
					onChange={ this.props.onChangeFontStyle }
				/>

				{ ! this.props.disableTransform && (
					<SelectControl
						label={ __( 'Font Transform' ) }
						value={ this.props.valueTransform }
						options={ [
							{
								label: __( 'Default' ),
								value: 'none'
							},
							{
								label: __( 'Uppercase' ),
								value: 'uppercase'
							},
							{
								label: __( 'Lowercase' ),
								value: 'lowercase'
							},
							{
								label: __( 'Capitalize' ),
								value: 'capitalize'
							}
						] }
						onChange={ this.props.onChangeTextTransform }
					/>
				) }
			</div>
		);
	}
}

export default withInstanceId( GoogleFontsControl );
