/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { get } = lodash;

const {
	registerBlockType,
	createBlock
} = wp.blocks;

const {
	Toolbar,
	TextControl
} = wp.components;

const { BlockControls } = wp.editor;

const { withSelect } = wp.data;

const { RichText } = wp.editor;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

registerBlockType( 'themeisle-blocks/tweetable', {
	title: __( 'Click To Tweet' ),
	description: __( 'Click to Tweet allows visitors to easily share your content on Twitter.' ),
	icon: 'twitter',
	category: 'themeisle-blocks',
	keywords: [
		__( 'twitter' ),
		__( 'tweet' ),
		__( 'orbitfox' )
	],
	attributes: {
		quote: {
			type: 'string',
			source: 'children',
			selector: 'p',
			default: []
		},
		permalink: {
			type: 'url'
		},
		via: {
			type: 'string'
		},
		buttonText: {
			type: 'string',
			default: __( 'Click to Tweet' )
		}
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ({ content }) => {
					return createBlock( 'themeisle-blocks/tweetable', { quote: content });
				}
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ({ value, citation }) => {
					if ( ( ! value || ! value.length ) && ! citation ) {
						return createBlock( 'themeisle-blocks/tweetable' );
					}
					return ( value || []).map( item => createBlock( 'themeisle-blocks/tweetable', {
						quote: [ get( item, 'children.props.children', '' ) ]
					}) ).concat( citation ? createBlock( 'core/paragraph', {
						content: citation
					}) : []);
				}
			},
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				transform: ({ value, citation }) => {
					if ( ( ! value || ! value.length ) && ! citation ) {
						return createBlock( 'themeisle-blocks/tweetable' );
					}
					return ( value || []).map( item => createBlock( 'themeisle-blocks/tweetable', {
						quote: [ get( item, 'children.props.children', '' ) ]
					}) ).concat( citation ? createBlock( 'core/paragraph', {
						quote: citation
					}) : []);
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ({ content, quote }) => {
					if ( ! quote || ! quote.length ) {
						return createBlock( 'core/paragraph' );
					}
					return ( quote || []).map( item => createBlock( 'core/paragraph', {
						content: quote
					}) );
				}
			},
			{
				type: 'block',
				blocks: [ 'core/quote' ],
				transform: ({ quote }) => {
					return createBlock( 'core/quote', {
						value: [
							{ children: <p key="1">{ quote }</p> }
						]
					});
				}
			},
			{
				type: 'block',
				blocks: [ 'core/pullquote' ],
				transform: ({ quote }) => {
					return createBlock( 'core/pullquote', {
						value: [
							{ children: <p key="1">{ quote }</p> }
						]
					});
				}
			}
		]
	},

	edit: withSelect( ( select, props ) => {
		const { getPermalink } = select( 'core/editor' );
		if ( props.attributes.permalink === undefined ) {
			props.setAttributes({ permalink: getPermalink() });
		}
		return {
			permalink: getPermalink(),
			props
		};
	})( ({ props, className }) => {
		const onChangeQuote = ( value ) => {
			props.setAttributes({ quote: value });
		};

		const onChangeButton = ( value ) => {
			props.setAttributes({ buttonText: value });
		};

		const onChangeVia = ( value ) => {
			props.setAttributes({ via: value });
		};

		return [
			<BlockControls key="controls">
				<Toolbar>
					<i className="fas fa-at tweetable-icon"></i>
					<TextControl
						type="text"
						placeholder="Username"
						className="tweetable-controls"
						value={ props.attributes.via }
						onChange={ onChangeVia }
					/>
				</Toolbar>
			</BlockControls>,
			<blockquote className={ className }>
				<RichText
					tagName="p"
					multiline="false"
					placeholder={ __( 'What should we tweet?' ) }
					value={ props.attributes.quote }
					formattingControls={ [] }
					onChange={ onChangeQuote }
					keepPlaceholderOnFocus
				/>

				<RichText
					tagName="span"
					placeholder={ __( 'Tweet this!' ) }
					className="tweetbutton"
					value={ props.attributes.buttonText ? props.attributes.buttonText : __( 'Tweet this!' ) }
					formattingControls={ [] }
					onChange={ onChangeButton }
					keepPlaceholderOnFocus
				/>
			</blockquote>
		];
	}),

	save: props => {
		const viaUrl = props.attributes.via ? `&via=${ props.attributes.via }` : '';

		const tweetUrl = `http://twitter.com/share?&text=${ encodeURIComponent( props.attributes.quote ) }&url=${ props.attributes.permalink }${ viaUrl }`;

		return (
			<blockquote>
				<RichText.Content
					tagName="p"
					value={ props.attributes.quote }
				/>

				<RichText.Content
					tagName="a"
					className="tweetbutton"
					href={ tweetUrl }
					value={ props.attributes.buttonText }
					target="_blank"
				/>
			</blockquote>
		);
	}
});
