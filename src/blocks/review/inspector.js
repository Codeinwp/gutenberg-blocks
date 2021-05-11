/**
 * WordPress dependencies
 */
const { pick } = lodash;

const { __ } = wp.i18n;

const {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder
} = wp.blockEditor;

const {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	RangeControl,
	TextControl,
} = wp.components;

const { useState } = wp.element;

const PanelItem = ({
	title,
	remove,
	children
}) => {
	const [ isOpen, setOpen ] = useState( false );

	return (
		<div className="wp-block-themeisle-blocks-review__inspector_panel_item">
			<div className="wp-block-themeisle-blocks-review__inspector_panel_item__header">
				<Button
					className="wp-block-themeisle-blocks-review__inspector_panel_item__title"
					onClick={ () => setOpen( ! isOpen ) }
				>
					{ title }
				</Button>

				<Button
					icon="no-alt"
					label={ __( 'Remove' ) }
					showTooltip={ true }
					className="wp-block-themeisle-blocks-review__inspector_panel_item__arrow"
					onClick={ remove }
				/>
			</div>

			{ isOpen && (
				<div className="wp-block-themeisle-blocks-review__inspector_panel_item__content">
					{ children }
				</div>
			) }
		</div>
	);
};

const Inspector = ({
	 attributes,
	 setAttributes,
}) => {
	const addFeature = () => {
		const features = [ ...attributes.features ];
		features.push({
			title: __( 'Feature' ),
			rating: 9
		});
		setAttributes( { features } );
	};

	const changeFeature = ( index, value ) => {
		const features = [ ...attributes.features ];
		features[ index ] = {
			...features[ index ],
			...value
		};
		setAttributes( { features } );
	};

	const removeFeature = ( index ) => {
		let features = [ ...attributes.features ];
		features = features.filter( ( el, i ) => i !== index );
		setAttributes( { features } );
	};

	const addPro = () => {
		const pros = [ ...attributes.pros ];
		pros.push( '' );
		setAttributes( { pros } );
	};

	const changePro = ( index, value ) => {
		const pros = [ ...attributes.pros ];
		pros[ index ] = value;
		setAttributes( { pros } );
	};

	const removePro = ( index ) => {
		let pros = [ ...attributes.pros ];
		pros = pros.filter( ( el, i ) => i !== index );
		setAttributes( { pros } );
	};

	const addCon = () => {
		const cons = [ ...attributes.cons ];
		cons.push( '' );
		setAttributes( { cons } );
	};

	const changeCon = ( index, value ) => {
		const cons = [ ...attributes.cons ];
		cons[ index ] = value;
		setAttributes( { cons } );
	};

	const removeCon = ( index ) => {
		let cons = [ ...attributes.cons ];
		cons = cons.filter( ( el, i ) => i !== index );
		setAttributes( { cons } );
	};

	const addLinks = () => {
		const links = [ ...attributes.links ];
		links.push({
			label: __( 'Buy Now' ),
			href: ''
		});
		setAttributes( { links } );
	};

	const changeLinks = ( index, value ) => {
		const links = [ ...attributes.links ];
		links[ index ] = {
			...links[ index ],
			...value
		};
		setAttributes( { links } );
	};

	const removeLinks = ( index ) => {
		let links = [ ...attributes.links ];
		links = links.filter( ( el, i ) => i !== index );
		setAttributes( { links } );
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Product Details' ) }
			>
				<TextControl
					label={ __( 'Product Name' ) }
					type="text"
					placeholder={ __( 'Name of your product…' ) }
					value={ attributes.title }
					onChange={ title => setAttributes({ title }) }
				/>

				<BaseControl>
					<TextControl
						label={ __( 'Currency' ) }
						type="text"
						placeholder={ __( 'Currency code, like USD or EUR.' ) }
						value={ attributes.currency }
						onChange={ currency => setAttributes({ currency }) }
					/>

					{ __( 'Currency code in three digit ISO 4217 code.' ) + ' ' }

					<ExternalLink href="https://en.wikipedia.org/wiki/ISO_4217#Active_codes">
						{ __( 'List of ISO 4217 codes.' ) }
					</ExternalLink>
				</BaseControl>

				<TextControl
					label={ __( 'Price' ) }
					type="number"
					value={ attributes.price }
					onChange={ price => setAttributes({ price }) }
				/>

				<TextControl
					label={ __( 'Discounted Price' ) }
					type="number"
					value={ attributes.discounted }
					onChange={ discounted => setAttributes({ discounted }) }
				/>

				{ ! attributes.image ? (
					<MediaPlaceholder
						labels={ {
							title: __( 'Product Image' )
						} }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						value={ attributes.image }
						onSelect={ value => setAttributes({ image: pick( value, [ 'id', 'alt', 'url' ] ) }) }
					/>
				) : (
					<BaseControl
						className="wp-block-themeisle-blocks-review__inspector_image"
					>
						<img
							src={ attributes.image.url }
							alt={ attributes.image.alt }
						/>

						<Button
							isSecondary
							onClick={ () => setAttributes({ image: undefined }) }
						>
							{ __( 'Remove image' ) }
						</Button>
					</BaseControl>
				) }
			</PanelBody>

			<PanelBody
				title={ __( 'Product Features' ) }
				initialOpen={ false }
			>
				{ attributes.features.length > 0 && attributes.features.map( ( feature, index ) => (
					<PanelItem
						title={ feature.title || __( 'Feature' ) }
						remove={ () => removeFeature( index ) }
					>
						<TextControl
							label={ __( 'Title' ) }
							type="text"
							placeholder={ __( 'Feature title' ) }
							value={ feature.title }
							onChange={ title => changeFeature( index, { title } ) }
						/>

						<RangeControl
							label={ __( 'Rating' ) }
							value={ feature.rating }
							onChange={ rating => changeFeature( index, { rating } ) }
							min={ 1 }
							max={ 10 }
						/>
					</PanelItem>
				) ) }

				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-review__inspector_add"
					onClick={ addFeature }
				>
					{ __( 'Add Feature' ) }
				</Button>
			</PanelBody>

			<PanelBody
				title={ __( 'Pros' ) }
				initialOpen={ false }
			>
				{ attributes.pros.length > 0 && attributes.pros.map( ( pro, index ) => (
					<PanelItem
						title={ pro || __( 'Pro' ) }
						remove={ () => removePro( index ) }
					>
						<TextControl
							label={ __( 'Title' ) }
							type="text"
							placeholder={ __( 'Why do you like the product?' ) }
							value={ pro }
							onChange={ value => changePro( index, value ) }
						/>
					</PanelItem>
				) ) }

				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-review__inspector_add"
					onClick={ addPro }
				>
					{ __( 'Add Item' ) }
				</Button>
			</PanelBody>

			<PanelBody
				title={ __( 'Cons' ) }
				initialOpen={ false }
			>
				{ attributes.cons.length > 0 && attributes.cons.map( ( con, index ) => (
					<PanelItem
						title={ con || __( 'Con' ) }
						remove={ () => removeCon( index ) }
					>
						<TextControl
							label={ __( 'Title' ) }
							type="text"
							placeholder={ __( 'What can be improved?' ) }
							value={ con }
							onChange={ value => changeCon( index, value ) }
						/>
					</PanelItem>
				) ) }

				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-review__inspector_add"
					onClick={ addCon }
				>
					{ __( 'Add Item' ) }
				</Button>
			</PanelBody>

			<PanelBody
				title={ __( 'Links' ) }
				initialOpen={ false }
			>
				{ attributes.links.length > 0 && attributes.links.map( ( link, index ) => (
					<PanelItem
						title={ link.label || __( 'Link' ) }
						remove={ () => removeLinks( index ) }
					>
						<TextControl
							label={ __( 'Label' ) }
							type="text"
							placeholder={ __( 'Button label' ) }
							value={ link.label }
							onChange={ label => changeLinks( index, { label } ) }
						/>

						<TextControl
							label={ __( 'Link' ) }
							type="url"
							placeholder={ __( 'https://…' ) }
							value={ link.href }
							onChange={ href => changeLinks( index, { href } ) }
						/>
					</PanelItem>
				) ) }

				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-review__inspector_add"
					onClick={ addLinks }
				>
					{ __( 'Add Links' ) }
				</Button>
			</PanelBody>

			<PanelColorSettings
				title={ __( 'Color' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: attributes.primaryColor,
						onChange: value => setAttributes({ primaryColor: value }),
						label: __( 'Primary' )
					},
					{
						value: attributes.backgroundColor,
						onChange: value => setAttributes({ backgroundColor: value }),
						label: __( 'Background' )
					},
					{
						value: attributes.textColor,
						onChange: value => setAttributes({ textColor: value }),
						label: __( 'Text' )
					},
					{
						value: attributes.buttonTextColor,
						onChange: value => setAttributes({ buttonTextColor: value }),
						label: __( 'Button Text' )
					}
				] }
			>

				<ContrastChecker
					{ ...{
						textColor: attributes.primaryColor,
						backgroundColor: attributes.backgroundColor
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default Inspector;
