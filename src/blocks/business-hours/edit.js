/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import {
	Fragment,
	useEffect,
	useState,
	useRef
} from '@wordpress/element';

import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import { InnerBlocks } from '@wordpress/block-editor';

import { blockInit } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';

const Edit = ({ attributes, setAttributes, clientId, className, isSelected }) => {

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes }/>
			<div className={className} id={ attributes.id }>
				<div className="wp-block-themeisle-blocks-business-hours-title">
					<RichText
						placeholder={ __( 'Add title', 'otter-blocks' ) }
						value={ attributes.title }
						onChange={ title => {
							setAttributes({ title });
						} }
						tagName="div"
					/>
				</div>
				<div className="wp-block-themeisle-blocks-business-hours-content">
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/business-hours-item' ] }
						template={ [ [ 'themeisle-blocks/business-hours-item' ] ] }
						renderAppender={ isSelected ? InnerBlocks.ButtonBlockAppender : '' }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
