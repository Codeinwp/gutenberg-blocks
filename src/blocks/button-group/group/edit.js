/**
 * External dependencies
 */
import classnames from 'classnames';
import GoogleFontLoader from 'react-google-font-loader';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

const { useViewportMatch } = wp.compose;

const { useSelect } = wp.data;

const {
	Fragment,
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import Controls from './controls.js';
import Inspector from './inspector.js';
import { addBlockId } from '../../../helpers/block-utility.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	name,
	clientId
}) => {
	const {
		isViewportAvailable,
		isPreviewDesktop,
		isPreviewTablet,
		isPreviewMobile
	} = useSelect( select => {
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return {
			isViewportAvailable: __experimentalGetPreviewDeviceType ? true : false,
			isPreviewDesktop: __experimentalGetPreviewDeviceType ? 'Desktop' === __experimentalGetPreviewDeviceType() : false,
			isPreviewTablet: __experimentalGetPreviewDeviceType ? 'Tablet' === __experimentalGetPreviewDeviceType() : false,
			isPreviewMobile: __experimentalGetPreviewDeviceType ? 'Mobile' === __experimentalGetPreviewDeviceType() : false
		};
	}, []);

	const isLarger = useViewportMatch( 'large', '>=' );

	const isLarge = useViewportMatch( 'large', '<=' );

	const isSmall = useViewportMatch( 'small', '>=' );

	const isSmaller = useViewportMatch( 'small', '<=' );

	useEffect( () => {
		const unsubscribe = addBlockId({
			attributes,
			setAttributes,
			clientId,
			name,
			idPrefix: 'wp-block-themeisle-blocks-button-group-',
			defaultAttributes
		});
		return () => unsubscribe();
	}, []);

	let isDesktop = isLarger && ! isLarge && isSmall && ! isSmaller;

	let isTablet = ! isLarger && ! isLarge && isSmall && ! isSmaller;

	let isMobile = ! isLarger && ! isLarge && ! isSmall && ! isSmaller;

	if ( isViewportAvailable && ! isMobile ) {
		isDesktop = isPreviewDesktop;
		isTablet = isPreviewTablet;
		isMobile = isPreviewMobile;
	}

	return (
		<Fragment>
			{ attributes.fontFamily && (
				<GoogleFontLoader fonts={ [ {
					font: attributes.fontFamily,
					weights: attributes.fontVariant && [ `${ attributes.fontVariant + ( 'italic' === attributes.fontStyle ? ':i' : '' ) }` ]
				} ] } />
			) }

			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				id={ attributes.id }
				className={ classnames(
					className,
					'wp-block-buttons',
					{
						[ `align-${ attributes.align }` ]: attributes.align,
						'collapse': ( 'collapse-desktop' === attributes.collapse && ( isDesktop || isTablet || isMobile ) ) || ( 'collapse-tablet' === attributes.collapse && ( isTablet || isMobile ) ) || ( 'collapse-mobile' === attributes.collapse && isMobile )
					}
				) }
			>
				<InnerBlocks
					allowedBlocks={ [ 'themeisle-blocks/button' ] }
					__experimentalMoverDirection="horizontal"
					orientation="horizontal"
					template={ [ [ 'themeisle-blocks/button' ] ] }
					renderAppender={ InnerBlocks.DefaultAppender }
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
