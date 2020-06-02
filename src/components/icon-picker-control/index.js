/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { useInstanceId } = wp.compose;

const {
	Button,
	BaseControl,
	Dropdown,
	MenuGroup,
	MenuItem,
	TextControl
} = wp.components;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';
import data from './icons.json';

const IconPickerControl = ({
	label,
	prefix,
	icon,
	onChange
}) => {
	const instanceId = useInstanceId( IconPickerControl );

	useEffect( () => {
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

		setIcons( icons );
	}, []);

	const [ search, setSearch ] = useState( '' );
	const [ icons, setIcons ] = useState( null );

	const id = `inspector-icon-picker-control-${ instanceId }`;

	return (
		<BaseControl
			label={ label }
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
						{ ( prefix && icon ) ?
							<Fragment>
								<i
									className={ classnames(
										prefix,
										`fa-${ icon }`,
										'fa-fw'
									) }
								>
								</i>
								{ icon }
							</Fragment> : __( 'Select Icon' )
						}
					</Button>
				) }
				renderContent={ ({ onToggle }) => (
					<MenuGroup label={ __( 'Font Awesome Icons' ) }>
						<TextControl
							value={ search }
							onChange={ e => setSearch( e ) }
						/>

						<div className="components-popover__items">
							{ ( icons ).map( i => {
								if ( ! search || i.search.some( o => o.toLowerCase().match( search.toLowerCase() ) ) ) {
									return (
										<MenuItem
											label={ i.label }
											className={ classnames(
												{ 'is-selected': ( i.name === icon && i.prefix === prefix ) }
											) }
											onClick={ () => {
												onToggle();
												onChange({
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
};

export default IconPickerControl;
