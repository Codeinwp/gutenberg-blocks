/**
 * External dependencies
 */
import classnames from 'classnames';
import GoogleFontLoader from 'react-google-font-loader';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	isEqual,
	omit,
	pick,
	times
} = lodash;

const { IconButton } = wp.components;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import defaults from '../../plugins/options/global-defaults/defaults.js';
import Controls from './controls.js';
import Inspector from './inspector.js';
import Button from './components/button-edit.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	name,
	isSelected,
	clientId
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-button-group-${ clientId.substr( 0, 8 ) }`;

			const globalDefaults = window.themeisleGutenberg.globalDefaults ? window.themeisleGutenberg.globalDefaults : undefined;

			if ( undefined !== globalDefaults ) {
				if ( ! isEqual( defaults[ name ], window.themeisleGutenberg.globalDefaults[ name ]) ) {
					attrs = omit({ ...window.themeisleGutenberg.globalDefaults[ name ] }, 'data' );

					Object.keys( attrs ).map( i => {
						if ( attributes[i] !== attrs[i] && ( undefined !== defaultAttributes[i].default || ( undefined !== defaultAttributes[i].default && attributes[i] !== defaultAttributes[i].default ) ) ) {
							return delete attrs[i];
						}
					});

					const data = pick({ ...window.themeisleGutenberg.globalDefaults[ name ] }, 'data' );
					const buttonAttrs = [];

					attributes.data.forEach( ( i, n ) => {
						const currentData = { ...data.data };

						Object.keys( currentData ).map( o => {
							if ( i[o] !== currentData[o] && ( undefined === defaultAttributes.data.default[n][o] || ( undefined !== defaultAttributes.data.default[n][o] && i[o] !== defaultAttributes.data.default[n][o]) ) ) {
								return delete currentData[o];
							}
						});

						buttonAttrs.push({
							...i,
							...currentData
						});
					});

					if ( ! isEqual( buttonAttrs, attributes.data ) ) {
						attrs.data = buttonAttrs;
					}
				}
			}

			setAttributes({
				...attrs,
				id: instanceId
			});

			IDs.push( instanceId );
			blockIDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-button-group-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
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
			if ( attributes.data.length < value ) {
				const data = [ ...attributes.data ];
				times( value - attributes.data.length, () => {
					data.push({
						text: attributes.data[0].text,
						link: attributes.data[0].link,
						newTab: attributes.data[0].newTab,
						color: attributes.data[0].color,
						border: attributes.data[0].border,
						background: attributes.data[0].background,
						hoverColor: attributes.data[0].hoverColor,
						hoverBackground: attributes.data[0].hoverBackground,
						hoverBorder: attributes.data[0].hoverBorder,
						borderSize: attributes.data[0].borderSize,
						borderRadius: attributes.data[0].borderRadius,
						boxShadow: attributes.data[0].boxShadow,
						boxShadowColor: attributes.data[0].boxShadowColor,
						boxShadowColorOpacity: attributes.data[0].boxShadowColorOpacity,
						boxShadowBlur: attributes.data[0].boxShadowBlur,
						boxShadowSpread: attributes.data[0].boxShadowSpread,
						boxShadowHorizontal: attributes.data[0].boxShadowHorizontal,
						boxShadowVertical: attributes.data[0].boxShadowVertical,
						hoverBoxShadowColor: attributes.data[0].hoverBoxShadowColor,
						hoverBoxShadowColorOpacity: attributes.data[0].hoverBoxShadowColorOpacity,
						hoverBoxShadowBlur: attributes.data[0].hoverBoxShadowBlur,
						hoverBoxShadowSpread: attributes.data[0].hoverBoxShadowSpread,
						hoverBoxShadowHorizontal: attributes.data[0].hoverBoxShadowHorizontal,
						hoverBoxShadowVertical: attributes.data[0].hoverBoxShadowVertical,
						iconType: attributes.data[0].iconType,
						prefix: attributes.data[0].prefix,
						icon: attributes.data[0].icon,
						paddingTopBottom: attributes.data[0].paddingTopBottom,
						paddingLeftRight: attributes.data[0].paddingLeftRight
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
		if ( ! value ) {
			setAttributes({
				fontFamily: value,
				fontVariant: value
			});
		} else {
			setAttributes({
				fontFamily: value,
				fontVariant: 'normal',
				fontStyle: 'normal'
			});
		}
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
		const updatedData = attributes.data.map( ( item, i ) => {
			if ( index === i ) {
				item = { ...item, ...value };
			}
			return item;
		});

		setAttributes({
			data: updatedData
		});
	};

	const collapseClass = 'collapse-none' !== attributes.collapse ? attributes.collapse : '';

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
					collapseClass,
					'wp-block-button'
				) }
				style={ {
					justifyContent: attributes.align,
					alignItems: attributes.align ? attributes.align : 'flex-start'
				} }
			>
				{ times( attributes.buttons, i => (
					<Button
						index={ i }
						attributes={ attributes }
						isSelected={ isSelected }
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
