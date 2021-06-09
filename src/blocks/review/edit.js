/**
 * External dependencies.
 */
import classnames from 'classnames';

import getSymbolFromCurrency from 'currency-symbol-map';

/**
 * WordPress dependencies.
 */
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
import Inspector from './inspector.js';
import {
	check,
	close,
	StarFilled
} from '../../helpers/icons.js';
import { addBlockId } from '../../helpers/block-utility.js';

const Edit = ({
	attributes,
	setAttributes,
	clientId,
	name,
	className,
	isSelected
}) => {
	useEffect( () => {
		const unsubscribe = addBlockId({
			attributes,
			setAttributes,
			clientId,
			name,
			idPrefix: 'wp-block-themeisle-blocks-review-',
			defaultAttributes
		});
		return () => unsubscribe();
	}, []);

	const overallRatings = Math.round( attributes.features.reduce( ( accumulator, feature ) =>  accumulator + feature.rating, 0 ) / attributes.features.length );

	const stars = [];

	for ( let i = 0; 10 > i; i++ ) {
		stars.push(
			<StarFilled
				className={ classnames(
					{
						'low': 3 >= overallRatings && i < overallRatings,
						'medium': 3 < overallRatings && 8 > overallRatings && i < overallRatings,
						'high': 7 < overallRatings && 10 >= overallRatings && i < overallRatings
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
		setAttributes({ features });
	};

	const changePro = ( index, value ) => {
		const pros = [ ...attributes.pros ];
		pros[ index ] = value;
		setAttributes({ pros });
	};

	const changeCon = ( index, value ) => {
		const cons = [ ...attributes.cons ];
		cons[ index ] = value;
		setAttributes({ cons });
	};

	const changeLinks = ( index, value ) => {
		const links = [ ...attributes.links ];
		links[ index ] = {
			...links[ index ],
			...value
		};
		setAttributes({ links });
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
				style={ {
					backgroundColor: attributes.backgroundColor
				} }
			>
				<div
					className="wp-block-themeisle-blocks-review__header"
					style={ {
						borderColor: attributes.primaryColor
					} }
				>
					<RichText
						placeholder={ __( 'Name of your product…' ) }
						allowedFormats={ [] }
						value={ attributes.title }
						onChange={ title => setAttributes({ title }) }
						tagName="h3"
						style={ {
							color: attributes.textColor
						} }
					/>

					<div className="wp-block-themeisle-blocks-review__header_meta">
						<div className="wp-block-themeisle-blocks-review__header_ratings">
							{ stars }

							<span
								style={ {
									color: attributes.textColor
								} }
							>
								{ sprintf( __( '%d out of 10' ), overallRatings || 0 ) }
							</span>
						</div>

						<span
							className="wp-block-themeisle-blocks-review__header_price"
							style={ {
								color: attributes.textColor
							} }
						>
							{ ( attributes.price && attributes.discounted ) && (
								<del>{ ( getSymbolFromCurrency( attributes.currency ) ?? '$' ) + '' + attributes.price || 0 }</del>
							) }

							{ ( attributes.price || attributes.discounted ) && ( getSymbolFromCurrency( attributes.currency ) ?? '$' ) + '' + ( attributes.discounted ? attributes.discounted : attributes.price ) }
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
								style={ {
									color: attributes.textColor
								} }
							/>
						) }
					</div>

					<div className="wp-block-themeisle-blocks-review__left_features">
						{ 0 < attributes.features.length && attributes.features.map( ( feature, index ) => {
							const ratings = [];

							for ( let i = 0; 10 > i; i++ ) {
								ratings.push(
									<StarFilled
										className={ classnames(
											{
												'low': 3 >= feature.rating && i < feature.rating,
												'medium': 3 < feature.rating && 8 > feature.rating && i < feature.rating,
												'high': 7 < feature.rating && 10 >= feature.rating && i < feature.rating
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
										onChange={ title => changeFeature( index, { title }) }
										tagName="span"
										style={ {
											color: attributes.textColor
										} }
									/>

									<div className="wp-block-themeisle-blocks-review__left_feature_ratings">
										{ ratings }

										<span
											style={ {
												color: attributes.textColor
											} }
										>
											{ feature.rating }/10
										</span>
									</div>
								</div>
							);
						}) }
					</div>
				</div>

				<div className="wp-block-themeisle-blocks-review__right">
					{ 0 < attributes.pros.length && (
						<div className="wp-block-themeisle-blocks-review__right_pros">
							<h4
								style={ {
									color: attributes.textColor
								} }
							>
								{ __( 'Pros' ) }
							</h4>

							{ attributes.pros.map( ( pro, index ) => (
								<div className="wp-block-themeisle-blocks-review__right_pros_item">
									{ check }

									<RichText
										placeholder={ __( 'Why do you like the product?' ) }
										value={ pro }
										onChange={ value => changePro( index, value ) }
										tagName="p"
										style={ {
											color: attributes.textColor
										} }
									/>
								</div>
							) )}
						</div>
					) }

					{ 0 < attributes.cons.length && (
						<div className="wp-block-themeisle-blocks-review__right_cons">
							<h4
								style={ {
									color: attributes.textColor
								} }
							>
								{ __( 'Cons' ) }
							</h4>

							{ attributes.cons.map( ( con, index ) => (
								<div className="wp-block-themeisle-blocks-review__right_cons_item">
									{ close }

									<RichText
										placeholder={ __( 'What can be improved?' ) }
										value={ con }
										onChange={ value => changeCon( index, value ) }
										tagName="p"
										style={ {
											color: attributes.textColor
										} }
									/>
								</div>
							) )}
						</div>
					) }
				</div>

				{ 0 < attributes.links.length && (
					<div className="wp-block-themeisle-blocks-review__footer">
						<span
							className="wp-block-themeisle-blocks-review__footer_label"
							style={ {
								color: attributes.textColor
							} }
						>
							{ __( 'Buy this product' ) }
						</span>

						<div className="wp-block-themeisle-blocks-review__footer_buttons">
							{ attributes.links.map( ( link, index ) => (
								<RichText
									placeholder={ __( 'Button label' ) }
									value={ link.label }
									onChange={ label => changeLinks( index, { label }) }
									tagName="span"
									style={ {
										color: attributes.buttonTextColor,
										backgroundColor: attributes.primaryColor
									} }
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
