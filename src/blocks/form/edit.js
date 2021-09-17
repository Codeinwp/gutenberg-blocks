/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/block-editor';

import {
	Fragment,
	useEffect
} from '@wordpress/element';

import {
	select,
	useSelect,
	useDispatch
} from '@wordpress/data';

import {
	createBlocksFromInnerBlocksTemplate
} from '@wordpress/blocks';

import {
	__experimentalBlockVariationPicker as VariationPicker
} from '@wordpress/block-editor';

import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { blockInit } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	name
}) => {
	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {
		if (  attributes.id && select( 'core/edit-widgets' ) ) {
			setAttributes({ optionName: `widget_${ attributes.id.slice( -8 ) }` });
		} else  if ( attributes.id && select( 'core/editor' )?.getCurrentPostId() ) {
			setAttributes({ optionName: `${ select( 'core/editor' ).getCurrentPostId() }_${ attributes.id.slice( -8 ) }` });
		}
	}, [ attributes.id ]);

	const hasInnerBlocks = useSelect(
		( select ) =>
			0 < select( 'core/block-editor' ).getBlocks( clientId ).length,
		[ clientId ]
	);

	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation
			} = select( 'core/blocks' );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				variations: getBlockVariations( name, 'block' )
			};
		},
		[ name ]
	);
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	/**
	 * Save integration data.
	 */
	useEffect( () => {
		( new wp.api.models.Settings() ).fetch().done( res => {
			const emails = res.themeisle_blocks_form_emails ? res.themeisle_blocks_form_emails : [];
			let isMissing = true;

			emails?.forEach( ({ form }, index )=> {
				if ( form === attributes.optionName ) {
					if ( emails[index]?.integration ) {
						emails[index].integration = {};
					}
					emails[index].integration.provider = attributes.provider; // update the value
					emails[index].integration.apiKey = attributes.apiKey;
					emails[index].integration.listId = attributes.listId;
					emails[index].integration.action = attributes.action;
					isMissing = false;
				}
			});

			if ( isMissing ) {
				emails.push({
					form: attributes.optionName,
					integration: {
						provider: attributes.provider,
						apiKey: attributes.apiKey,
						listId: attributes.listId,
						action: attributes.action
					}
				});
			}

			const model = new wp.api.models.Settings({
				// eslint-disable-next-line camelcase
				themeisle_blocks_form_emails: emails
			});

			model.save();
		});
	}, [ attributes.hasCaptcha ]);

	const hasIntegrationActive = attributes.provider && attributes.apiKey && attributes.listId;

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				className={ className }
				id={ attributes.id }
			>
				{
					hasInnerBlocks ? (
						<div className="wp-block-themeisle-blocks-form__container">
							<InnerBlocks
							/>

							<div className="wp-block-button">
								<button className="wp-block-button__link">
									{ __( hasIntegrationActive && 'subscribe' === attributes.action ? 'Subscribe' : 'Submit', 'otter-blocks' ) }
								</button>
							</div>
						</div>
					) : (
						<VariationPicker
							icon={ get( blockType, [ 'icon', 'src' ]) }
							label={ get( blockType, [ 'title' ]) }
							variations={ variations }
							onSelect={ ( nextVariation = defaultVariation ) => {
								if ( nextVariation ) {
									replaceInnerBlocks(
										clientId,
										createBlocksFromInnerBlocksTemplate(
											nextVariation.attributes.innerBlocks
										),
										true
									);
								}
							} }
							allowSkip
						/>
					)
				}
			</div>
		</Fragment>
	);
};

export default Edit;
