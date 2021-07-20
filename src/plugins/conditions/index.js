/**
 * WordPress dependencies.
 */
import { assign } from 'lodash';

import { createHigherOrderComponent } from '@wordpress/compose';

import { Fragment } from '@wordpress/element';

import { addFilter } from '@wordpress/hooks';

/**
  * Internal dependencies.
  */
import './editor.scss';
import Edit from './edit.js';

const addAttribute = ( props ) => {
	props.attributes = assign( props.attributes, {
		otterConditions: {
			type: 'array',
			items: {
				type: 'object'
			}
		}
	});

	return props;
};

const withConditions = createHigherOrderComponent( BlockEdit => {
	return ( props ) => {
		return (
			<Fragment>
				<BlockEdit { ...props } />
				<Edit { ...props } />
			</Fragment>
		);
	};
}, 'withMasonryExtension' );


addFilter( 'blocks.registerBlockType', 'themeisle-gutenberg/conditions', addAttribute );
addFilter( 'editor.BlockEdit', 'themeisle-gutenberg/conditions', withConditions );
