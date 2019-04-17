/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	Placeholder,
	Dashicon,
	TextControl,
	Spinner,
	Button,
	Toolbar,
	Tooltip
} = wp.components;

const {
	compose,
	withState
} = wp.compose;

const { BlockControls } = wp.editor;

const { withSelect } = wp.data;

const { ENTER } = wp.keycodes;

const starRating = stars => {
	const rating = Math.floor( stars / 10 ) / 2;
	const fullStars = Math.floor( rating );
	const halfStars = Math.ceil( rating - fullStars );
	const emptyStars = 5 - fullStars - halfStars;
	const ratings = '<span className="star-full"></span>'.repeat( fullStars ) + '<span className="star-half"></span>'.repeat( halfStars ) + '<span className="star-empty"></span>'.repeat( emptyStars );
	return ratings;
};

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import { pluginsIcon } from '../../helpers/icons.js';

import { unescapeHTML } from '../../helpers/helper-functions.js';

registerBlockType( 'themeisle-blocks/plugin-cards', {
	title: __( 'Plugin Card' ),
	description: __( 'Plugin Card block lets you display plugins data in your blog posts.' ),
	icon: pluginsIcon,
	category: 'themeisle-blocks',
	keywords: [
		'plugin',
		'card',
		'orbitfox'
	],
	attributes: {
		slug: {
			type: 'string'
		},
		pluginIcon: {
			type: 'string'
		},
		pluginName: {
			type: 'string'
		},
		pluginAuthor: {
			type: 'string'
		},
		pluginRating: {
			type: 'number'
		},
		pluginDescription: {
			type: 'string'
		},
		pluginInstalls: {
			type: 'number'
		},
		pluginVersion: {
			type: 'string'
		},
		pluginTested: {
			type: 'string'
		},
		pluginLink: {
			type: 'string'
		}
	},

	supports: {
		html: false
	},

	edit: compose([

		withSelect( ( select, props ) => {
			return {
				props
			};
		}),

		withState({
			status: 0,
			results: {}
		})

	])( ({ props, className, status, results, setState }) => {

		const changeSlug = value => {
			props.setAttributes({ slug: value });
		};

		const searchPlugins = search => {
			setState({ status: 1 });
			wp.apiFetch({ path: `themeisle-gutenberg-blocks/v1/get_plugins?search='${ encodeURIComponent( search ) }` }).then( payload => {
				const data = payload.data.plugins;
				setState({
					status: 0,
					results: data
				});
			});
		};

		const selectPlugin = data => {
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
			props.setAttributes({
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
			setState({
				results: {}
			});
		};

		return [
			( props.attributes.pluginName ) && (
				<BlockControls key="toolbar-controls">
					<Toolbar
						className='components-toolbar'
					>
						<Tooltip text={ __( 'Edit Plugin Card' )	}>
							<Button
								className="components-icon-button components-toolbar__control edit-plugin-card"
								onClick={ () => {
									props.setAttributes({
										pluginIcon: '',
										pluginName: '',
										pluginAuthor: '',
										pluginRating: '',
										pluginDescription: '',
										pluginInstalls: '',
										pluginVersion: '',
										pluginTested: '',
										pluginLink: ''
									});
								} }
							>
								<Dashicon icon="edit" />
							</Button>
						</Tooltip>
					</Toolbar>
				</BlockControls>
			),
			<div className={ className }>
				{ ( props.attributes.pluginName ) ?
					<div className="themeisle-plugin-card">
						<div className="card-header">
							<div className="card-main">
								<div className="card-logo">
									<img src={ props.attributes.pluginIcon } alt={ unescapeHTML( props.attributes.pluginName ) } title={ unescapeHTML( props.attributes.pluginName ) }/>
								</div>
								<div className="card-info">
									<h4>{ unescapeHTML( props.attributes.pluginName ) }</h4>
									<h5 dangerouslySetInnerHTML={ { __html: _.unescape( props.attributes.pluginAuthor ) } }></h5>
								</div>
								<div className={ 'card-ratings' } dangerouslySetInnerHTML={ { __html: _.unescape( starRating( props.attributes.pluginRating ) ) } }></div>
							</div>
						</div>
						<div className="card-details">
							<div className="card-description">{ unescapeHTML( props.attributes.pluginDescription ) }</div>
							<div className="card-stats">
								<h5>{__( 'Plugin Stats' ) }</h5>
								<div className="card-stats-list">
									<div className="card-stat">
										<span className="card-text-large">{ props.attributes.pluginInstalls.toLocaleString() }+</span>
										{ __( 'active installs' ) }
									</div>
									<div className="card-stat">
										<span className="card-text-large">{ props.attributes.pluginVersion }</span>
										{ __( 'version' ) }
									</div>
									<div className="card-stat">
										<span className="card-text-large">{ props.attributes.pluginTested }</span>
										{ __( 'tested up to' ) }
									</div>
								</div>
							</div>
						</div>
						<div className="card-download">
							<a href={ props.attributes.pluginLink }>{ __( 'Download' ) }</a>
						</div>
					</div>				:
					<Placeholder
						icon="admin-plugins"
						label={ __( 'Plugin Card' ) }
					>
						<div className="search-plugin-field">
							<Dashicon icon="search" />
							{ 1 === status && (
								<Spinner/>
							) }
							<TextControl
								type="text"
								placeholder={ __( 'Search for plugin…' ) }
								value={ props.attributes.slug }
								onChange={ changeSlug }
								onKeyDown={ ( event ) => {
									if ( event.keyCode === ENTER ) {
										searchPlugins( event.target.value );
									}
								}}
							/>
							{ results && (
								<div className="plugin-card-search-results">
									<div>
										{ Object.keys( results ).map( ( i, j ) => {
											const pluginData = results[i];
											let icon;
											if ( pluginData.icons.svg ) {
												icon = pluginData.icons.svg;
											} if ( pluginData.icons['2x']) {
												icon = pluginData.icons['2x'];
											} if ( pluginData.icons['1x']) {
												icon = pluginData.icons['1x'];
											} if ( pluginData.icons.default ) {
												icon = pluginData.icons.default;
											}
											return (
												<div className="plugin-card-list-item" key={i} onClick={ ( e ) => {
													e.preventDefault();
													selectPlugin( pluginData );
												} }>
													<img src={ icon } />
													<span dangerouslySetInnerHTML={ { __html: _.unescape( pluginData.name ) } }></span>
												</div>
											);
										}) }
									</div>
								</div>
							) }
						</div>
					</Placeholder>
				}
			</div>
		];
	}),

	save: () => {
		return null;
	}
});
