/**
 * WordPress dependencies...
 */
const {
	Fragment,
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import Controls from './controls.js';
import Inspector from './inspector.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	name
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-font-awesome-icons-${ clientId.substr( 0, 8 ) }`;

			const globalDefaults = window.themeisleGutenberg.globalDefaults ? window.themeisleGutenberg.globalDefaults : undefined;

			if ( undefined !== globalDefaults ) {
				attrs = { ...window.themeisleGutenberg.globalDefaults[ name ] };
			}

			setAttributes({
				...attrs,
				id: instanceId
			});

			IDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-font-awesome-icons-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
		}
	};

	const iconStyle = {
		borderRadius: attributes.borderRadius + '%',
		fontSize: attributes.fontSize + 'px',
		padding: attributes.padding + 'px'
	};

	const containerStyle = {
		color: attributes.textColor,
		backgroundColor: attributes.backgroundColor,
		borderColor: attributes.borderColor,
		borderRadius: attributes.borderRadius + '%',
		borderStyle: 'solid',
		borderWidth: attributes.borderSize + 'px',
		display: 'inline-block',
		margin: attributes.margin + 'px'
	};

	return (
		<Fragment>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<style>
				{ `#${ attributes.id } .${ className }-container:hover {
						color: ${ attributes.textColorHover ? attributes.textColorHover : attributes.textColor } !important;
						background: ${ attributes.backgroundColorHover ? attributes.backgroundColorHover : attributes.backgroundColor } !important;
						border-color: ${ attributes.borderColorHover ? attributes.borderColorHover : attributes.borderColor } !important;
					}` }
			</style>

			<p
				className={ className }
				id={ attributes.id }
				style={{ textAlign: attributes.align }}
			>
				<span
					className="wp-block-themeisle-blocks-font-awesome-icons-container"
					style={ containerStyle }
				>
					<i
						className={ `${ attributes.prefix } fa-${ attributes.icon }` }
						style={ iconStyle }
					>
					</i>
				</span>
			</p>
		</Fragment>
	);
};

export default Edit;
