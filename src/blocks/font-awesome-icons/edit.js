/**
 * WordPress dependencies...
 */
import { isEqual } from 'lodash';

import {
	Fragment,
	useEffect
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import defaults from '../../plugins/options/global-defaults/defaults.js';
import Controls from './controls.js';
import Inspector from './inspector.js';
import themeIsleIcons from './../../helpers/themeisle-icons';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
	name
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-font-awesome-icons-${ clientId.substr( 0, 8 ) }`;

			const globalDefaults = window.themeisleGutenberg.globalDefaults ? window.themeisleGutenberg.globalDefaults : undefined;

			if ( undefined !== globalDefaults ) {
				if ( ! isEqual( defaults[ name ], window.themeisleGutenberg.globalDefaults[ name ]) ) {
					attrs = { ...window.themeisleGutenberg.globalDefaults[ name ] };

					Object.keys( attrs ).map( i => {
						if ( attributes[i] !== attrs[i] && ( undefined !== defaultAttributes[i].default && attributes[i] !== defaultAttributes[i].default ) ) {
							return delete attrs[i];
						}
					});
				}
			}

			setAttributes({
				...attrs,
				id: instanceId
			});

			IDs.push( instanceId );
			blockIDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-font-awesome-icons-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};

	let iconStyle = {
		borderRadius: attributes.borderRadius + '%',
		fontSize: attributes.fontSize + 'px',
		padding: attributes.padding + 'px'
	};

	if ( 'themeisle-icons' === attributes.library ) {
		iconStyle = {
			fill: attributes.textColor,
			padding: attributes.padding + 'px',
			width: attributes.fontSize + attributes.padding * 2 + attributes.borderSize * 2
		};
	}

	const containerStyle = {
		color: attributes.textColor,
		backgroundColor: attributes.backgroundColor,
		borderColor: attributes.borderColor,
		borderRadius: attributes.borderRadius + '%',
		borderStyle: 'solid',
		borderWidth: attributes.borderSize + 'px',
		margin: attributes.margin + 'px',
		width: attributes.fontSize + attributes.padding * 2 + attributes.borderSize * 2
	};

	const Icon = themeIsleIcons.icons[ attributes.icon ];

	return (
		<Fragment>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
			/>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<style>
				{
					`#${ attributes.id } .${ className }-container:hover {
						color: ${ attributes.textColorHover ? attributes.textColorHover : attributes.textColor } !important;
						background: ${ attributes.backgroundColorHover ? attributes.backgroundColorHover : attributes.backgroundColor } !important;
						border-color: ${ attributes.borderColorHover ? attributes.borderColorHover : attributes.borderColor } !important;
					}
					
					#${ attributes.id } .${ className }-container:hover svg {
						fill: ${ attributes.textColorHover ? attributes.textColorHover : attributes.textColor } !important;
					}`
				}
			</style>

			<p
				className={ className }
				id={ attributes.id }
				style={ { textAlign: attributes.align } }
			>
				<span
					className="wp-block-themeisle-blocks-font-awesome-icons-container"
					style={ containerStyle }
				>
					{ 'themeisle-icons' === attributes.library ?
						<Icon style={ iconStyle } /> :
						<i
							className={ `${ attributes.prefix } fa-${ attributes.icon }` }
							style={ iconStyle }
						>
						</i>
					}
				</span>
			</p>
		</Fragment>
	);
};

export default Edit;
