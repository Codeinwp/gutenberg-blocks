/* eslint-disable no-unused-vars */
/** @jsx jsx */

import { __ } from '@wordpress/i18n';
import { ResizableBox } from '@wordpress/components';
import {
	Fragment,
	useEffect,
	useState,
	useRef
} from '@wordpress/element';

import {
	css,
	jsx
} from '@emotion/react';

import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import { InnerBlocks } from '@wordpress/block-editor';

import { blockInit } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';

const Edit = ({ attributes, setAttributes, clientId, className, isSelected, toggleSelection }) => {

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	const style = {
		container: {
			backgroundColor: attributes.backgroundColor,
			borderRadius: attributes.borderRadius + 'px',
			borderWidth: attributes.borderWidth + 'px',
			borderColor: attributes.borderColor,
			width: attributes.width + 'px'
		},
		title: {
			fontSize: attributes.titleFontSize + 'px',
			color: attributes.color
		}
	};

	const contentCSS = css`
		div > div.block-editor-block-list__layout div + div {
			margin-bottom: ${ attributes.gap }px;
		}

		.wp-block-themeisle-blocks-business-hours-item {
			font-size: ${ attributes.itemsFontSize }px;
		}
	`;

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes }/>
			<div className={className} id={ attributes.id }>
				<ResizableBox
					size={ {
						width: attributes.width
					} }
					minWidth={ 200 }
					maxWidth={ 800 }
					enable={ {
						top: false,
						right: true,
						bottom: false,
						left: false
					} }
					showHandle={ isSelected }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes({ width: Number( attributes.width + delta.width ) });
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
					<div style={ style.container } className="wp-block-themeisle-blocks-business-hours-container">
						<div style={ style.title } className="wp-block-themeisle-blocks-business-hours-title">
							<RichText
								placeholder={ __( 'Add title', 'otter-blocks' ) }
								value={ attributes.title }
								onChange={ title => {
									setAttributes({ title });
								} }
								tagName="div"
							/>
						</div>
						<div css={ contentCSS } className="wp-block-themeisle-blocks-business-hours-content">
							<InnerBlocks
								allowedBlocks={ [ 'themeisle-blocks/business-hours-item' ] }
								template={ [ [ 'themeisle-blocks/business-hours-item' ] ] }
								renderAppender={ isSelected ? InnerBlocks.ButtonBlockAppender : '' }
							/>
						</div>

					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default Edit;
