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
	Component,
	createRef
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

class LinkControl extends Component {
	constructor() {
		super( ...arguments );
		this.bindSuggestionNode = this.bindSuggestionNode.bind( this );
		this.updateSuggestions = this.updateSuggestions.bind( this );
		this.onChangeValue = this.onChangeValue.bind( this );
		this.clickSuggestion = this.clickSuggestion.bind( this );
		this.onKeyDown = this.onKeyDown.bind( this );
		this.autocompleteRef = this.autocompleteRef || createRef();

		this.scrollingIntoView = false;
		this.suggestionNodes = [];

		this.state = {
			isOpen: false,
			showSuggestions: false,
			selectedSuggestion: null,
			suggestions: []
		};
	}

	componentDidUpdate() {
		if ( this.state.showSuggestions && null !== this.state.selectedSuggestion && ! this.scrollingIntoView && null !== this.autocompleteRef.current ) {
			this.scrollingIntoView = true;

			scrollIntoView( this.suggestionNodes[ this.state.selectedSuggestion ], this.autocompleteRef.current, {
				onlyScrollIfNeeded: true
			});

			setTimeout( () => {
				this.scrollingIntoView = false;
			}, 100 );
		}
	}

	componentWillUnmount() {
		delete this.suggestionsRequest;
	}

	bindSuggestionNode( index ) {
		return ( ref ) => {
			this.suggestionNodes[ index ] = ref;
		};
	}

	updateSuggestions( value ) {
		const { fetchLinkSuggestions } = this.props;

		if ( 1 >= value.length || /^https?:/.test( value ) ) {
			this.setState({ showSuggestions: false });

			return;
		}

		this.setState({ showSuggestions: true });

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
			if ( this.suggestionsRequest !== request ) {
				return;
			}

			this.setState({ suggestions });
		});

		this.suggestionsRequest = request;
	}

	onChangeValue( event ) {
		this.props.onChange( event.target.value );
		if ( ! this.props.suggestions ) {
			this.updateSuggestions( event.target.value );
		}
	}

	clickSuggestion( value ) {
		this.props.onChange( value );
		this.setState({ showSuggestions: false });
	}

	onKeyDown( event ) {
		if ( this.state.showSuggestions && 1 <= this.state.suggestions.length ) {

			const suggestion = this.state.suggestions[ this.state.selectedSuggestion ];

			switch ( event.keyCode ) {
			case UP: {
				event.stopPropagation();
				event.preventDefault();
				const previousIndex = ! this.state.selectedSuggestion ? this.state.suggestions.length - 1 : this.state.selectedSuggestion - 1;
				this.setState({ selectedSuggestion: previousIndex });
				break;
			}
			case DOWN: {
				event.stopPropagation();
				event.preventDefault();
				const nextIndex = null === this.state.selectedSuggestion || ( this.state.selectedSuggestion === this.state.suggestions.length - 1 ) ? 0 : this.state.selectedSuggestion + 1;
				this.setState({ selectedSuggestion: nextIndex });
				break;
			}
			case TAB: {
				if ( null !== this.state.selectedSuggestion ) {
					event.stopPropagation();
					this.clickSuggestion( suggestion.url );
				}
				break;
			}
			case ENTER: {
				if ( null !== this.state.selectedSuggestion ) {
					event.stopPropagation();
					this.clickSuggestion( suggestion.url );
				}
				break;
			}
			}
		}
	}

	render() {
		const id = `inspector-link-control-${ this.props.instanceId }`;

		return (
			<BaseControl
				id={ id }
				label={ this.props.label }
				help={ this.props.help }
				className={ this.props.className }
			>
				<div
					className={ classnames(
						'wp-block-themeisle-blocks-link-control-wrapper',
						{ 'is-open': this.state.isOpen }
					) }
				>
					<input
						type="url"
						placeholder={ this.props.placeholder }
						value={ this.props.value }
						onChange={ this.onChangeValue }
						onKeyDown={ this.onKeyDown }
						className={ classnames(
							'components-text-control__input',
							{ 'is-full': undefined === this.props.children }
						) }
					/>

					{ ( this.state.showSuggestions && 0 < this.state.suggestions.length ) && (
						<Popover
							position="bottom"
							noArrow
							focusOnMount={ false }
							className="wp-block-themeisle-blocks-link-control-popover"
						>
							<div
								ref={ this.autocompleteRef }
								className="wp-block-themeisle-blocks-link-control-popover-container"
							>
								{ this.state.suggestions.map( ( suggestion, index ) => (
									<button
										key={ suggestion.id }
										role="option"
										tabIndex="-1"
										ref={ this.bindSuggestionNode( index ) }
										className={ classnames(
											'block-editor-url-input__suggestion',
											{ 'is-selected': index === this.state.selectedSuggestion  }
										) }
										onClick={ () => this.clickSuggestion( suggestion.url ) }
									>
										{ suggestion.title || __( 'Untitled Post' ) }
									</button>
								) ) }
							</div>
						</Popover>
					)}

					{ undefined !== this.props.children && (
						<IconButton
							icon="admin-generic"
							tooltip={ __( 'Link Options' ) }
							onClick={ () => this.setState({ isOpen: ! this.state.isOpen }) }
						/>
					) }
				</div>

				{ this.state.isOpen && this.props.children }
			</BaseControl>
		);
	}
}

export default compose(
	withInstanceId,
	withSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		return {
			fetchLinkSuggestions: getSettings().__experimentalFetchLinkSuggestions
		};
	})
)( LinkControl );
