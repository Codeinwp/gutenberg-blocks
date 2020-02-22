/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { apiFetch } = wp;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import Placeholder from './placeholder.js';
import Controls from './controls.js';
import { unescapeHTML } from '../../helpers/helper-functions.js';

const starRating = stars => {
	const rating = Math.floor( stars / 10 ) / 2;
	const fullStars = Math.floor( rating );
	const halfStars = Math.ceil( rating - fullStars );
	const emptyStars = 5 - fullStars - halfStars;
	const ratings = '<span className="star-full"></span>'.repeat( fullStars ) + '<span className="star-half"></span>'.repeat( halfStars ) + '<span className="star-empty"></span>'.repeat( emptyStars );
	return ratings;
};

const Edit = ({
	attributes,
	setAttributes,
	className
}) => {
	useEffect( () => {
		if ( attributes.slug ) {
			fetchPlugin();
		}
	}, []);

	const [ isLoaded, setLoaded ] = useState( false );
	const [ isFetching, setFetching ] = useState( false );
	const [ hasError, setError ] = useState( false );
	const [ data, setData ] = useState({});

	const fetchPlugin = async() => {
		setLoaded( true );
		setError( false );
		setFetching( true );
		let data = await apiFetch({ path: `themeisle-gutenberg-blocks/v1/get_plugin?slug=${ encodeURIComponent( attributes.slug ) }` });
		if ( data.data.errors ) {
			setError( true );
			setLoaded( false );
			setFetching( false );
			return;
		}
		saveData( data.data );
		setFetching( false );
	};

	const saveData = data => {
		let icon;
		if ( data.icons.svg ) {
			icon = data.icons.svg;
		} if ( data.icons['2x']) {
			icon = data.icons['2x'];
		} if ( data.icons['1x']) {
			icon = data.icons['1x'];
		} if ( data.icons.default ) {
			icon = data.icons.default;
		}

		setData({
			slug: data.slug,
			pluginIcon: icon,
			pluginName: data.name,
			pluginAuthor: data.author,
			pluginRating: data.rating,
			pluginDescription: data.short_description,
			pluginInstalls: data.active_installs,
			pluginVersion: data.version,
			pluginTested: data.tested,
			pluginLink: data.download_link
		});

		setLoaded( true );
	};

	if ( ! isLoaded || isFetching ) {
		return (
			<Placeholder
				attributes={ attributes }
				setAttributes={ setAttributes }
				isFetching={ isFetching }
				hasError={ hasError }
				setError={ setError }
				fetchPlugin={ fetchPlugin }
				saveData={ saveData }
				className={ className }
			/>
		);
	}

	return (
		<Fragment>
			<Controls setLoaded={ setLoaded }/>

			<div className={ className }>
				<div className="wp-block-themeisle-blocks-plugin-cards-wrapper">
					<div className="wp-block-themeisle-blocks-plugin-cards-header">
						<div className="wp-block-themeisle-blocks-plugin-cards-main">
							<div className="wp-block-themeisle-blocks-plugin-cards-logo">
								<img src={ data.pluginIcon } alt={ unescapeHTML( data.pluginName ) } title={ unescapeHTML( data.pluginName ) }/>
							</div>
							<div className="wp-block-themeisle-blocks-plugin-cards-info">
								<h4>{ unescapeHTML( data.pluginName ) }</h4>
								<h5 dangerouslySetInnerHTML={ { __html: _.unescape( data.pluginAuthor ) } }></h5>
							</div>
							<div className={ 'wp-block-themeisle-blocks-plugin-cards-ratings' } dangerouslySetInnerHTML={ { __html: _.unescape( starRating( data.pluginRating ) ) } }></div>
						</div>
					</div>

					<div className="wp-block-themeisle-blocks-plugin-cards-details">
						<div className="wp-block-themeisle-blocks-plugin-cards-description">{ unescapeHTML( data.pluginDescription ) }</div>
						<div className="wp-block-themeisle-blocks-plugin-cards-stats">
							<h5>{ __( 'Plugin Stats' ) }</h5>
							<div className="wp-block-themeisle-blocks-plugin-cards-stats-list">
								<div className="wp-block-themeisle-blocks-plugin-cards-stat">
									<span className="wp-block-themeisle-blocks-plugin-cards-text-large">{ data.pluginInstalls.toLocaleString() }+</span>
									{ __( 'active installs' ) }
								</div>
								<div className="wp-block-themeisle-blocks-plugin-cards-stat">
									<span className="wp-block-themeisle-blocks-plugin-cards-text-large">{ data.pluginVersion }</span>
									{ __( 'version' ) }
								</div>
								<div className="wp-block-themeisle-blocks-plugin-cards-stat">
									<span className="wp-block-themeisle-blocks-plugin-cards-text-large">{ data.pluginTested }</span>
									{ __( 'tested up to' ) }
								</div>
							</div>
						</div>
					</div>

					<div className="wp-block-themeisle-blocks-plugin-cards-download">
						<a href={ data.pluginLink }>{ __( 'Download' ) }</a>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
