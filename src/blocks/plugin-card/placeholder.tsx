/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * External dependencies
 */

import scrollIntoView from 'dom-scroll-into-view';
import * as React from 'react';
import { BlockEditProps } from '@wordpress/blocks';
import { PluginCardAttrs } from './attributes';
import { useEffect, useRef, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { Dashicon, Placeholder, Spinner, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n/build-types';
import { DOWN, ENTER, TAB, UP } from '@wordpress/keycodes';
import { PluginCardSearchResponse, PluginsCardData } from '../../@types/plugin-card';
import { unescape } from 'lodash';

type BlockPlaceholder = Pick<BlockEditProps<PluginCardAttrs>, 'setAttributes' | 'className'> & {
    hasError: boolean,
    setError: React.Dispatch<React.SetStateAction<boolean>>
};

const blockPlaceholder: React.FunctionComponent<BlockPlaceholder> = ({
	setAttributes,
	hasError,
	setError,
	className
}) => {
	const searchRef = useRef<HTMLDivElement>( null );
	let scrollingIntoView = false;
	const suggestionNodes: HTMLButtonElement[] = [];

	const [ isLoading, setLoading ] = useState( false );
	const [ query, setQuery ] = useState( '' );
	const [ results, setResults ] = useState<PluginsCardData[]>([]);
	const [ selectedSuggestion, setSelectedSuggestion ] = useState<number | null>( null );

	useEffect( () => {
		if ( null !== selectedSuggestion && ! scrollingIntoView && searchRef.current ) {
			scrollingIntoView = true;

			scrollIntoView( suggestionNodes[ selectedSuggestion ], searchRef.current, {
				onlyScrollIfNeeded: true
			});

			suggestionNodes[ selectedSuggestion ].focus();

			setTimeout( () => {
				scrollingIntoView = false;
			}, 100 );
		}
	}, [ selectedSuggestion ]);

	const bindSuggestionNode = ( index: number ) => {
		return ( instance: HTMLButtonElement | null ) => {
			if ( instance ) {
				suggestionNodes[ index ] = instance;
			}
		};
	};

	const searchPlugins = async( query: string ) => {
		setAttributes({ slug: '' });
		setLoading( true );
		setError( false );
		const data = await apiFetch<PluginCardSearchResponse>({ path: `themeisle-gutenberg-blocks/v1/get_plugins?search=${ encodeURIComponent( query ) }` });
		if ( data.data.errors ) {
			setError( true );
			setLoading( false );
			setSelectedSuggestion( null );
			setResults([]);
			return;
		}
		setLoading( false );
		setSelectedSuggestion( null );
		setResults( data.data.plugins );
	};

	const moveUp = ( event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLButtonElement> ) => {
		if ( results.length ) {
			event.stopPropagation();
			event.preventDefault();
			const previousIndex = ! selectedSuggestion ? results.length - 1 : selectedSuggestion - 1;
			setSelectedSuggestion( previousIndex );
		}
	};

	const moveDown = ( event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLButtonElement> ) => {
		if ( results.length ) {
			event.stopPropagation();
			event.preventDefault();
			const nextIndex = null === selectedSuggestion || ( selectedSuggestion === results.length - 1 ) ? 0 : selectedSuggestion + 1;
			setSelectedSuggestion( nextIndex );
		}
	};

	const searchKeyDown = ( event: React.KeyboardEvent<HTMLInputElement> ) => {
		switch ( event.keyCode ) {
		case UP: {
			moveUp( event );
			break;
		}
		case DOWN: {
			moveDown( event );
			break;
		}
		case TAB: {
			if ( results.length && ! event.shiftKey ) {
				setSelectedSuggestion( 0 );
			}
			break;
		}
		case ENTER: {
			searchPlugins( event.currentTarget.value );
			break;
		}
		}
	};

	const listKeyDown = ( event: React.KeyboardEvent<HTMLButtonElement>, data: PluginsCardData ) => {
		switch ( event.keyCode ) {
		case UP: {
			moveUp( event );
			break;
		}
		case DOWN: {
			moveDown( event );
			break;
		}
		case TAB: {
			if ( event.shiftKey ) {
				if ( 0 !== selectedSuggestion ) {
					moveUp( event );
				}

				break;
			}

			if ( selectedSuggestion === results.length - 1 ) {
				break;
			}

			moveDown( event );
			break;
		}
		case ENTER: {
			selectPlugin( data );
			break;
		}
		}
	};

	const selectPlugin = ({ slug }: PluginsCardData ) => {
		setAttributes({ slug: slug });
		setResults([]);
	};

	return (
		<Placeholder
			icon="admin-plugins"
			label={ __( 'Plugin Card' ) }
			instructions={ __( 'Search for the plugin you want to display.' ) }
			className={ className }
		>
			<div className="wp-block-themeisle-blocks-plugin-cards-search-field">
				<Dashicon icon="search"/>

				{ isLoading && (
					<Spinner/>
				) }

				<TextControl
					type="text"
					placeholder={ __( 'Search for plugin…' ) }
					value={ query }
					onChange={ setQuery }
					onKeyDown={ searchKeyDown }
					onFocus={ () => setSelectedSuggestion( null ) }
				/>

				{ results && (
					<div
						tabIndex={-1}
						className="wp-block-themeisle-blocks-plugin-cards-search-results"
						ref={ searchRef }
					>
						{ results.map( ( pluginData, i ) => {
							const icon = pluginData.icons?.svg || pluginData.icons['2x'] ||  pluginData.icons['1x'] || pluginData.icons.default || '';

							// if ( pluginData.icons.svg ) {
							// 	icon = pluginData.icons.svg;
							// } if ( pluginData.icons['2x']) {
							// 	icon = pluginData.icons['2x'];
							// } if ( pluginData.icons['1x']) {
							// 	icon = pluginData.icons['1x'];
							// } if ( pluginData.icons.default ) {
							// 	icon = pluginData.icons.default;
							// }
							return (
								<button
									className="wp-block-themeisle-blocks-plugin-cards-list-item"
									key={ i }
									ref={ bindSuggestionNode( i ) }
									onClick={ (e) => {
										e.preventDefault();
										selectPlugin( pluginData );
									} }
									onKeyDown={ e => listKeyDown( (e as React.KeyboardEvent<HTMLButtonElement>), pluginData ) }
								>
									<img src={ icon } />
									<span dangerouslySetInnerHTML={ { __html: unescape( pluginData.name ) } }></span>
								</button>
							);
						}) }
					</div>
				) }
			</div>

			{ hasError && (
				<div className="wp-block-themeisle-blocks-plugin-cards-error">
					<span>{ __( 'There seems to be an error. Make sure your internet is working properly.' ) }</span>
				</div>
			) }
		</Placeholder>
	);
};

export default blockPlaceholder;
