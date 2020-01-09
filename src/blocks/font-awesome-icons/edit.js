/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const {
	Fragment,
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import Controls from './controls.js';
import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		if ( attributes.id === undefined || attributes.id.substr( attributes.id.length - 8 ) !== clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-font-awesome-icons-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
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
