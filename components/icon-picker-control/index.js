/**
 * External dependencies...
 */
import classnames from 'classnames';
import Autosuggest from 'react-autosuggest';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Placeholder,
	Spinner
} = wp.components;

const {
	compose,
	withInstanceId,
	withState
} = wp.compose;

const { withSelect } = wp.data;

/**
 * Internal dependencies
 */
import './editor.scss';

function IconPickerControl({ label, prefix, icon, help, className, iconsList, suggestions, setState, instanceId, onChange }) {
	const id = `inspector-font-awesome-icon-control-${ instanceId }`;

	const getSuggestions = value => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return 0 === inputLength ? [] : iconsList.filter( icon =>
			icon.name.toLowerCase().slice( 0, inputLength ) === inputValue
		);
	};

	const getSuggestionValue = suggestion => suggestion;

	const renderSuggestion = suggestion => {
		return (
			<div
				className={ classnames(
					'icon-select',
					{ 'selected': ( suggestion.name === icon && suggestion.prefix === prefix ) },
				) }
			>
				<i className={ `${ suggestion.prefix } fa-fw fa-${ suggestion.name }` }></i>
				{ suggestion.name }
			</div>
		);
	};

	const renderSuggestionsContainer = ({ containerProps, children, query }) => {
		return (
			<div { ... containerProps }>
				{ children }
			</div>
		);
	};

	const onSuggestionsFetchRequested = ({ value }) => {
		setState({
			suggestions: getSuggestions( value )
		});
	};

	const onSuggestionsClearRequested = () => {
		setState({
			suggestions: []
		});
	};

	const inputProps = {
		placeholder: __( 'Start typing, like themeisle…' ),
		value: icon || '',
		onChange: ( event, { newValue }) => {
			onChange( newValue );
		}
	};

	if ( iconsList !== undefined && 0 < iconsList.length ) {
		return (
			<BaseControl
				label={ label }
				help={ help }
				className={ className }
			>
				<div
					className="font-awesome-auto-complete"
				>
					<label>
						<i className={ `${ prefix ? prefix : 'fab' } fa-${ icon ? icon : 'themeisle' }` }></i>
					</label>
					<Autosuggest
						id={ id }
						suggestions={ suggestions }
						onSuggestionsFetchRequested={ onSuggestionsFetchRequested }
						onSuggestionsClearRequested={ onSuggestionsClearRequested }
						getSuggestionValue={ getSuggestionValue }
						renderSuggestion={ renderSuggestion }
						renderSuggestionsContainer={ renderSuggestionsContainer }
						inputProps={ inputProps }
					/>
				</div>
			</BaseControl>
		);
	} else {
		return (
			<Placeholder>
				<Spinner />
			</Placeholder>
		);
	}
}

export default compose([

	withSelect( ( select ) => {
		const iconsList = select( 'themeisle-gutenberg/blocks' ).getFaIconsList();
		return {
			iconsList
		};
	}),

	withInstanceId,

	withState({
		suggestions: []
	})

])( IconPickerControl );
