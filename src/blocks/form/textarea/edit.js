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
		return () => unsubscribe( attributes.id );
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
					className="wp-block-themeisle-blocks-form-textarea-label"
				>
					<RichText
						placeholder={ __( 'Type here…', 'otter-blocks' )}
						className="wp-block-themeisle-blocks-form-textarea-label__label"
						value={ attributes.label }
						onChange={ label => setAttributes({ label }) }
						tagName="span"
					/>

					{ attributes.isRequired && (
						<span class="required">{ __( '(required)', 'otter-blocks' ) }</span>
					) }
				</label>

				<textarea
					placeholder={ attributes.placeholder }
					name={ attributes.id }
					id={ attributes.id }
					required={ attributes.isRequired }
					disabled
					rows={ 10 }
					className="wp-block-themeisle-blocks-form-textarea-input components-textarea-control__input"
				>
				</textarea>
			</div>
		</Fragment>
	);
};

export default Edit;
