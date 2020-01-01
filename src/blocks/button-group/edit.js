/**
 * External dependencies
 */
import classnames from 'classnames';
import GoogleFontLoader from 'react-google-font-loader';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { times } = lodash;

const { IconButton } = wp.components;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import Controls from './controls.js';
import Inspector from './inspector.js';
import Button from './components/button-edit.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		if ( attributes.id === undefined || attributes.id.substr( id.length - 8 ) !== clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-button-group-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
		}
	};

	const [ selectedButton, setSelectedButton ] = useState( 0 );
	const [ wait, setWait ] = useState( false );

	const changeButton = value => {
		setSelectedButton( value );
		setWait( true );

		setTimeout( () => {
			setWait( false );
		}, 500 );
	};

	const changeButtons = value => {
		if ( 1 <= value && 5 >= value ) {
			if ( data.length < value ) {
				times( value - data.length, i => {
					data.push({
						text: data[0].text,
						link: data[0].link,
						newTab: data[0].newTab,
						color: data[0].color,
						border: data[0].border,
						background: data[0].background,
						hoverColor: data[0].hoverColor,
						hoverBackground: data[0].hoverBackground,
						hoverBorder: data[0].hoverBorder,
						borderSize: data[0].borderSize,
						borderRadius: data[0].borderRadius,
						boxShadow: data[0].boxShadow,
						boxShadowColor: data[0].boxShadowColor,
						boxShadowColorOpacity: data[0].boxShadowColorOpacity,
						boxShadowBlur: data[0].boxShadowBlur,
						boxShadowSpread: data[0].boxShadowSpread,
						boxShadowHorizontal: data[0].boxShadowHorizontal,
						boxShadowVertical: data[0].boxShadowVertical,
						hoverBoxShadowColor: data[0].hoverBoxShadowColor,
						hoverBoxShadowColorOpacity: data[0].hoverBoxShadowColorOpacity,
						hoverBoxShadowBlur: data[0].hoverBoxShadowBlur,
						hoverBoxShadowSpread: data[0].hoverBoxShadowSpread,
						hoverBoxShadowHorizontal: data[0].hoverBoxShadowHorizontal,
						hoverBoxShadowVertical: data[0].hoverBoxShadowVertical,
						iconType: data[0].iconType,
						prefix: data[0].prefix,
						icon: data[0].icon,
						paddingTopBottom: data[0].paddingTopBottom,
						paddingLeftRight: data[0].paddingLeftRight
					});
				});

				setAttributes({ data });
			}
			setAttributes({ buttons: value });
			setSelectedButton( 0 );
		}
	};

	const changeFontSize = value => {
		setAttributes({ fontSize: value });
	};

	const changeFontFamily = value => {
		setAttributes({
			fontFamily: value,
			fontVariant: 'normal',
			fontStyle: 'normal'
		});
	};

	const changeFontVariant = value => {
		setAttributes({ fontVariant: value });
	};

	const changeFontStyle = value => {
		setAttributes({ fontStyle: value });
	};

	const changeTextTransform = value => {
		setAttributes({ textTransform: value });
	};

	const changeLineHeight = value => {
		setAttributes({ lineHeight: value });
	};

	const updateButton = ( value, index ) => {
		const updatedData = data.map( ( item, i ) => {
			if ( index === i ) {
				item = { ...item, ...value };
			}
			return item;
		});

		setAttributes({
			data: updatedData
		});
	};

	const collapseClass = 'collapse-none' !== collapse ? collapse : '';

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
				changeFontSize={ changeFontSize }
				changeFontFamily={ changeFontFamily }
				changeFontVariant={ changeFontVariant }
				changeFontStyle={ changeFontStyle }
				changeTextTransform={ changeTextTransform }
				changeLineHeight={ changeLineHeight }
			/>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				selectedButton={ selectedButton }
				wait={ wait }
				changeButtons={ changeButtons }
				changeButton={ changeButton }
				updateButton={ updateButton }
				changeFontSize={ changeFontSize }
				changeFontFamily={ changeFontFamily }
				changeFontVariant={ changeFontVariant }
				changeFontStyle={ changeFontStyle }
				changeTextTransform={ changeTextTransform }
				changeLineHeight={ changeLineHeight }
			/>

			<div
				id={ attributes.id }
				className={ classnames(
					className,
					attributes.collapseClass
				) }
				style={ {
					justifyContent: attributes.align,
					alignItems: attributes.align ? attributes.align : 'flex-start'
				} }
			>
				{ times( buttons, i => (
					<Button
						index={ i }
						attributes={ attributes }
						changeButton={ changeButton }
						updateButton={ updateButton }
					/>
				) ) }

				{ ( isSelected && 4 >= attributes.buttons ) && (
					<IconButton
						className="wp-block-themeisle-blocks-button-inserter"
						icon="plus-alt"
						onClick={ () => changeButtons( attributes.buttons + 1 ) }
						label={ __( 'Add Button' ) }
					/>
				) }
			</div>
		</Fragment>
	);
};

export default Edit;
