/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { RichText } from '@wordpress/block-editor';

import {
	Fragment,
	useEffect
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import { blockInit } from '../../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId
}) => {
	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div className={ className } >
				<label
					for={ attributes.id }
					className="wp-block-themeisle-blocks-form-input-label"
				>
					<RichText
						placeholder={ __( 'Type here…', 'otter-blocks' )}
						className="wp-block-themeisle-blocks-form-input-label__label"
						value={ attributes.label }
						onChange={ label => setAttributes({ label }) }
						tagName="span"
					/>

					{ attributes.isRequired && (
						<span class="required">{ __( '(required)', 'otter-blocks' ) }</span>
					) }
				</label>

				<input
					type={ attributes.type }
					placeholder={ attributes.placeholder }
					name={ attributes.id }
					id={ attributes.id }
					required={ attributes.isRequired }
					disabled
					className="wp-block-themeisle-blocks-form-input-input components-text-control__input"
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
