/**
 * External dependencies
 */
import classnames from 'classnames';
import scrollIntoView from 'dom-scroll-into-view';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { apiFetch } = wp;

const {
	BaseControl,
	IconButton,
	Popover
} = wp.components;

const {
	compose,
	withInstanceId
} = wp.compose;

const { withSelect } = wp.data;

const {
	useEffect,
	useRef,
	useState
} = wp.element;

const {
	DOWN,
	ENTER,
	TAB,
	UP
} = wp.keycodes;

const { addQueryArgs } = wp.url;

/**
 * Internal dependencies
 */
import './editor.scss';

const LinkControl = ({
	instanceId,
	label,
	help,
	placeholder,
	value,
	className,
	onChange,
	children,
	fetchLinkSuggestions
}) => {
	useEffect( () => {
		if ( showSuggestions && null !== selectedSuggestion && undefined !== suggestionNodes[ selectedSuggestion ] && ! scrollingIntoView && null !== autocompleteRef.current ) {
			scrollingIntoView = true;

			scrollIntoView( suggestionNodes[ selectedSuggestion ], autocompleteRef.current, {
				onlyScrollIfNeeded: true
			});

			setTimeout( () => {
				scrollingIntoView = false;
			}, 100 );
		}
	});

	const autocompleteRef = useRef( null );
	let scrollingIntoView = false;
	let suggestionNodes = [];
	let suggestionsRequest = [];

	const [ isOpen, setOpen ] = useState( false );
	const [ showSuggestions, setShowSuggestions ] = useState( false );
	const [ selectedSuggestion, setSelectedSuggestion ] = useState( null );
	const [ suggestions, setSuggestions ] = useState([]);

	const bindSuggestionNode = index => {
		return ( ref ) => {
			suggestionNodes[ index ] = ref;
		};
	};

	const updateSuggestions = value => {
		if ( 1 >= value.length || /^https?:/.test( value ) ) {
			setShowSuggestions( false );
			return;
		}

		setShowSuggestions( true );

		let request;

		if ( ! fetchLinkSuggestions ) {
			request = apiFetch({
				path: addQueryArgs( '/wp/v2/search', {
					search: value,
					per_page: 20, // eslint-disable-line camelcase
					type: 'post'
				})
			});
		} else {
			request = fetchLinkSuggestions( value );
		}

		request.then( ( suggestions ) => {
			if ( suggestionsRequest !== request ) {
				return;
			}

			setSuggestions( suggestions );
			setSelectedSuggestion( null );
		});

		suggestionsRequest = request;
	};

	const onChangeValue = event => {
		onChange( event.target.value );
		updateSuggestions( event.target.value );
	};

	const clickSuggestion = value => {
		onChange( value );
		setShowSuggestions( false );
	};

	const onKeyDown = event => {
		if ( showSuggestions && 1 <= suggestions.length ) {

			const suggestion = suggestions[ selectedSuggestion ];

			switch ( event.keyCode ) {
			case UP: {
				event.stopPropagation();
				event.preventDefault();
				const previousIndex = ! selectedSuggestion ? suggestions.length - 1 : selectedSuggestion - 1;
				setSelectedSuggestion( previousIndex );
				break;
			}
			case DOWN: {
				event.stopPropagation();
				event.preventDefault();
				const nextIndex = null === selectedSuggestion || ( selectedSuggestion === suggestions.length - 1 ) ? 0 : selectedSuggestion + 1;
				setSelectedSuggestion( nextIndex );
				break;
			}
			case TAB: {
				if ( null !== selectedSuggestion ) {
					event.stopPropagation();
					clickSuggestion( suggestion.url );
				}
				break;
			}
			case ENTER: {
				if ( null !== selectedSuggestion ) {
					event.stopPropagation();
					clickSuggestion( suggestion.url );
				}
				break;
			}
			}
		}
	};

	const id = `inspector-link-control-${ instanceId }`;

	return (
		<BaseControl
			label={ label }
			id={ id }
			help={ help }
			className={ className }
		>
			<div
				className={ classnames(
					'wp-block-themeisle-blocks-link-control-wrapper',
					{ 'is-open': isOpen }
				) }
			>
				<input
					type="url"
					placeholder={ placeholder }
					value={ value }
					onChange={ onChangeValue }
					onKeyDown={ onKeyDown }
					className={ classnames(
						'components-text-control__input',
						{ 'is-full': undefined === children }
					) }
				/>

				{ ( showSuggestions && 0 < suggestions.length ) && (
					<Popover
						position="bottom"
						noArrow
						focusOnMount={ false }
						className="wp-block-themeisle-blocks-link-control-popover"
					>
						<div
							ref={ autocompleteRef }
							className="wp-block-themeisle-blocks-link-control-popover-container"
						>
							{ suggestions.map( ( suggestion, index ) => (
								<button
									key={ suggestion.id }
									role="option"
									tabIndex="-1"
									ref={ bindSuggestionNode( index ) }
									className={ classnames(
										'block-editor-url-input__suggestion',
										'editor-url-input__suggestion',
										{ 'is-selected': index === selectedSuggestion  }
									) }
									onClick={ () => clickSuggestion( suggestion.url ) }
								>
									{ suggestion.title || __( 'Untitled Post' ) }
								</button>
							) ) }
						</div>
					</Popover>
				) }

				{ undefined !== children && (
					<IconButton
						icon="admin-generic"
						tooltip={ __( 'Link Options' ) }
						onClick={ () => setOpen( ! isOpen ) }
					/>
				) }
			</div>

			{ isOpen && children }
		</BaseControl>
	);
};

export default compose(
	withInstanceId,
	withSelect( ( select ) => {
		if ( ! select( 'core/block-editor' ) ) {
			return;
		}

		const { getSettings } = select( 'core/block-editor' );

		return {
			fetchLinkSuggestions: getSettings().__experimentalFetchLinkSuggestions
		};
	})
)( LinkControl );
