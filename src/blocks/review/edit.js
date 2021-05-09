/**
 * External dependencies.
 */
import classnames from 'classnames';

import getSymbolFromCurrency from 'currency-symbol-map'

/**
 * WordPress dependencies.
 */
const { isEqual } = lodash;

const {
	__,
	sprintf
} = wp.i18n;

const { RichText } = wp.blockEditor;

const {
	Fragment,
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import defaults from '../../plugins/options/global-defaults/defaults.js';
import Inspector from './inspector.js';
import {
	check,
	close,
	StarFilled
} from '../../helpers/icons.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	clientId,
	name,
	className,
	isSelected
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-review-${ clientId.substr( 0, 8 ) }`;
 
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
			const instanceId = `wp-block-themeisle-blocks-review-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}
 
		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};

	const overallRatings = Math.round( attributes.features.reduce( ( accumulator, feature ) =>  accumulator + feature.rating, 0 ) / attributes.features.length );

	const stars = [];

	for ( let i = 0; i < 10; i++) {
		stars.push(
			<StarFilled
				className={ classnames(
					{
						'low': overallRatings <= 3 && i < overallRatings,
						'medium': overallRatings > 3 && overallRatings < 8 && i < overallRatings,
						'high': overallRatings > 7 && overallRatings <= 10 && i < overallRatings
					}
				) }
			/>
		);
	}

	const changeFeature = ( index, value ) => {
		const features = [ ...attributes.features ];
		features[ index ] = {
			...features[ index ],
			...value
		};
		setAttributes( { features } );
	};

	const changePro = ( index, value ) => {
		const pros = [ ...attributes.pros ];
		pros[ index ] = value;
		setAttributes( { pros } );
	};

	const changeCon = ( index, value ) => {
		const cons = [ ...attributes.cons ];
		cons[ index ] = value;
		setAttributes( { cons } );
	};

	const changeLinks = ( index, value ) => {
		const links = [ ...attributes.links ];
		links[ index ] = {
			...links[ index ],
			...value
		};
		setAttributes( { links } );
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
			  id={ attributes.id }
			  className={ className }
			>
				<div className="wp-block-themeisle-blocks-review__header">
					<RichText
						placeholder={ __( 'Name of your product…' ) }
						allowedFormats={ [] }
						value={ attributes.title }
						onChange={ title => setAttributes({ title }) }
						tagName="h3"
					/>

					<div className="wp-block-themeisle-blocks-review__header_meta">
						<div className="wp-block-themeisle-blocks-review__header_ratings">
							{ stars }

							<span>{ sprintf( __( '%d out of 10' ), overallRatings || 0 ) } </span>
						</div>

						<span className="wp-block-themeisle-blocks-review__header_price">
							{ attributes.discounted && (
								<del>{ ( getSymbolFromCurrency( attributes.currency ) ?? '$' ) + '' + attributes.discounted }</del>
							) }

							{ ( getSymbolFromCurrency( attributes.currency ) ?? '$' ) + '' + attributes.price }
						</span>
					</div>
				</div>

				<div className="wp-block-themeisle-blocks-review__left">
					<div
						className={ classnames(
							'wp-block-themeisle-blocks-review__left_details',
							{
								'is-single': ! attributes.image || ( ! isSelected && ! attributes.description )
							}
						) }
					>
						{ attributes.image && (
							<img
								src={ attributes.image.url }
								alt={ attributes.image.alt }
							/>
						) }

						{ ( isSelected || attributes.description ) && (
							<RichText
								placeholder={ __( 'Product description or a small review…' ) }
								value={ attributes.description }
								onChange={ description => setAttributes({ description }) }
								tagName="p"
							/>
						) }
					</div>

					<div className="wp-block-themeisle-blocks-review__left_features">
						{ attributes.features.length > 0 && attributes.features.map( ( feature, index ) => {
							const ratings = [];

							for ( let i = 0; i < 10; i++) {
								ratings.push(
									<StarFilled
										className={ classnames(
											{
												'low': feature.rating <= 3 && i < feature.rating,
												'medium': feature.rating > 3 && feature.rating < 8 && i < feature.rating,
												'high': feature.rating > 7 && feature.rating <= 10 && i < feature.rating
											}
										) }
									/>
								);
							}

							return (
								<div className="wp-block-themeisle-blocks-review__left_feature">
									<RichText
										placeholder={ __( 'Feature title' ) }
										value={ feature.title }
										className="wp-block-themeisle-blocks-review__left_feature_title"
										onChange={ title => changeFeature( index, { title } ) }
										tagName="span"
									/>

									<div className="wp-block-themeisle-blocks-review__left_feature_ratings">
										{ ratings }

										<span>{ feature.rating }/10</span>
									</div>
								</div>
							)
						} ) }
					</div>
				</div>

				<div className="wp-block-themeisle-blocks-review__right">
					{ attributes.pros.length > 0 && (
						<div className="wp-block-themeisle-blocks-review__right_pros">
							<h4>{ __( 'Pros' ) }</h4>

							{ attributes.pros.map( ( pro, index ) => (
								<div className="wp-block-themeisle-blocks-review__right_pros_item">
									{ check }

									<RichText
										placeholder={ __( 'Why do you like the product?' ) }
										value={ pro }
										onChange={ value => changePro( index, value ) }
										tagName="p"
									/>
								</div>
							) )}
						</div>
					) }

					{ attributes.cons.length > 0 && (
						<div className="wp-block-themeisle-blocks-review__right_cons">
							<h4>{ __( 'Cons' ) }</h4>

							{ attributes.cons.map( ( con, index ) => (
								<div className="wp-block-themeisle-blocks-review__right_cons_item">
									{ close } 

									<RichText
										placeholder={ __( 'What can be improved?' ) }
										value={ con }
										onChange={ value => changeCon( index, value ) }
										tagName="p"
									/>
								</div>
							) )}
						</div>
					) }
				</div>

				{ attributes.links.length > 0 && (
					<div className="wp-block-themeisle-blocks-review__footer">
						<span className="wp-block-themeisle-blocks-review__footer_label">{ __( 'Buy this product' ) }</span>

						<div className="wp-block-themeisle-blocks-review__footer_buttons">
							{ attributes.links.map( ( link, index ) => (
								<RichText
									placeholder={ __( 'Button label' ) }
									value={ link.label }
									onChange={ label => changeLinks( index, { label } ) }
									tagName="span"
								/>
							) ) }
						</div>
					</div>
				) }
			</div>
		</Fragment>
	);
};
 
 export default Edit;
 