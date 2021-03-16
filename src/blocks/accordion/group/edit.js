/** @jsx jsx */

/**
 * External dependencies
 */
import classnames from 'classnames';

import {
	css,
	jsx
} from '@emotion/react';

/**
 * WordPress dependencies.
 */
const { isEqual } = lodash;

const { InnerBlocks } = wp.blockEditor;

const {
	Fragment,
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';

import Inspector from './inspector.js';
import defaults from '../../../plugins/options/global-defaults/defaults.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	name,
	clientId,
	isSelected
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-accordion-${ clientId.substr( 0, 8 ) }`;

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
			const instanceId = `wp-block-themeisle-blocks-accordion-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};


	const styles = css`
		&.wp-block-themeisle-blocks-accordion .wp-block-themeisle-blocks-accordion-item .wp-block-themeisle-blocks-accordion-item__title {
			color: ${ attributes.titleColor };
			background: ${ attributes.titleBackground };
			border-color: ${ attributes.borderColor };
		}

		&.wp-block-themeisle-blocks-accordion .wp-block-themeisle-blocks-accordion-item .wp-block-themeisle-blocks-accordion-item__title svg {
			fill: ${ attributes.titleColor };
		}

		&.wp-block-themeisle-blocks-accordion .wp-block-themeisle-blocks-accordion-item .wp-block-themeisle-blocks-accordion-item__content {
			background: ${ attributes.contentBackground };
			border-color: ${ attributes.borderColor };
		}
	`;

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				id={ attributes.id }
				className={ classnames(
					className,
					{
						[`is-${ attributes.gap }-gap`]: attributes.gap
					}
				) }
				css={ styles }
			>
				<InnerBlocks
					allowedBlocks={ [ 'themeisle-blocks/accordion-item' ] }
					template={ [ [ 'themeisle-blocks/accordion-item' ] ] }
					renderAppender={ isSelected ? InnerBlocks.ButtonBlockAppender : '' }
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
