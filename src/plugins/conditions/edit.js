/* eslint-disable camelcase */
/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { isEmpty } from 'lodash';

import { InspectorControls } from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	FormTokenField,
	PanelBody,
	SelectControl,
	TextControl
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import {
	Fragment,
	useEffect
} from '@wordpress/element';

/**
 * Internal dependencies.
 */
import PanelTab from '../../components/panel-tab/index.js';

const Edit = ({
	attributes,
	setAttributes
}) => {
	useEffect( () => {
		return () => {
			if ( ! Boolean( attributes.otterConditions.length ) ) {
				return;
			}

			let otterConditions = [ ...attributes.otterConditions  ];

			otterConditions.forEach( ( i, n ) => {
				if ( isEmpty( i ) ) {
					otterConditions.splice( n, 1 );
				}
			});

			if ( ! Boolean( otterConditions.length ) ) {
				otterConditions = undefined;
			}

			setAttributes({ otterConditions });
		};
	}, []);

	const { postAuthors } = useSelect( select => {
		const {
			getAuthors,
			getUsers
		} = select( 'core' );

		const authors = getAuthors();
		const include = authors.map( author => author.id );
		const users = getUsers({ include });

		let postAuthors = [];

		if ( users && Boolean( users.length ) ) {
			postAuthors = users.map( user => user.username );
		}

		return {
			postAuthors
		};
	});

	const addGroup = () => {
		const otterConditions = [ ...( attributes.otterConditions || [])  ];
		otterConditions.push([ {} ]);
		setAttributes({ otterConditions });
	};

	const removeGroup = n => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions.splice( n, 1 );
		setAttributes({ otterConditions });
	};

	const addNewCondition = index => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ index ].push({});
		setAttributes({ otterConditions });
	};

	const removeCondition = ( index, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ index ].splice( key, 1 );

		if ( 0 === otterConditions[ index ]) {
			otterConditions.splice( index, 1 );
		}

		setAttributes({ otterConditions });
	};

	const changeCondition = ( value, index, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];

		let attrs = {};

		if ( 'userRoles' === value || 'postAuthor' === value || 'postMeta' === value ) {
			attrs.visibility = true;
		}

		if ( 'postMeta' === value ) {
			attrs.meta_compare = 'is_true';
		}

		if ( 'none' === value ) {
			otterConditions[ index ][ key ] = {};
		} else {
			otterConditions[ index ][ key ] = {
				type: value,
				...attrs
			};
		}

		setAttributes({ otterConditions });
	};

	const changeRoles = ( value, index, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ index ][ key ].roles = value;
		setAttributes({ otterConditions });
	};

	const changeAuthors = ( value, index, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ index ][ key ].authors = value;
		setAttributes({ otterConditions });
	};

	const changeVisibility = ( value, index, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ index ][ key ].visibility = 'true' === value ? true : false;
		setAttributes({ otterConditions });
	};

	const changeValue = ( value, index, key, field ) => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ index ][ key ][ field ] = value;
		setAttributes({ otterConditions });
	};

	const getConditions = () => {
		const conditions = [
			{
				value: 'none',
				label: __( 'Select a condition', 'otter-blocks' ),
				help: __( 'Select a condition to control the visibility of your block.', 'otter-blocks' )
			},
			{
				value: 'loggedInUser',
				label: __( 'Logged In Users', 'otter-blocks' ),
				help: __( 'The selected block will only be visible to logged-in users.' )
			},
			{
				value: 'loggedOutUser',
				label: __( 'Logged Out Users', 'otter-blocks' ),
				help: __( 'The selected block will only be visible to logged-out users.' )
			},
			{
				value: 'userRoles',
				label: __( 'User Roles', 'otter-blocks' ),
				help: __( 'The selected block will only be visible to defined user roles.' )
			},
			{
				value: 'postAuthor',
				label: __( 'Post Author', 'otter-blocks' ),
				help: __( 'The selected block will only be visible to posts written by selected authors.' )
			},
			{
				value: 'postMeta',
				label: __( 'Post Meta', 'otter-blocks' ),
				help: __( 'The selected block will only be visible based on post meta condition.' )
			}
		];

		return conditions;
	};

	const Separator = ({ label }) => {
		return (
			<div className="wp-block-themeisle-blocks-conditions__operator-wrapper">
				<div className="wp-block-themeisle-blocks-conditions__operator-line"></div>
				<div className="wp-block-themeisle-blocks-conditions__operator-word">
					<span>{ label }</span>
				</div>
			</div>
		);
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Visibility Conditions', 'otter-blocks' ) }
				initialOpen={ false }
			>
				<p>{ __( 'Control the visibility of your blocks based on the following conditions.', 'otter-blocks' ) }</p>
				<p>{ __( 'Display the block if…', 'otter-blocks' ) }</p>

				{ attributes.otterConditions && attributes.otterConditions.map( ( group, index ) => {
					return (
						<Fragment>
							<PanelTab
								label={ __( 'Rule Group', 'otter-blocks' ) }
								onDelete={ () => removeGroup( index ) }
							>
								{ group && group.map( ( i, n ) => (
									<Fragment>
										<BaseControl
											label={ __( 'Condition', 'otter-blocks' ) }
											help={ getConditions().find( condition => condition.value === ( i.type || 'none' ) ).help }
											id={ `wp-block-themeisle-blocks-conditions-${ index }-${ n }` }
										>
											<select
												value={ i.type || '' }
												onChange={ e => changeCondition( e.target.value, index, n ) }
												className="components-select-control__input"
												id={ `wp-block-themeisle-blocks-conditions-${ index }-${ n }` }
											>
												<option value="none">{ __( 'Select a condition', 'otter-blocks' ) }</option>

												<optgroup label={ __( 'Users', 'otter-blocks' ) }>
													<option value="loggedInUser">{ __( 'Logged In Users', 'otter-blocks' ) }</option>
													<option value="loggedOutUser">{ __( 'Logged Out Users', 'otter-blocks' ) }</option>
													<option value="userRoles">{ __( 'User Roles', 'otter-blocks' ) }</option>
												</optgroup>

												<optgroup label={ __( 'Posts', 'otter-blocks' ) }>
													<option value="postAuthor">{ __( 'Post Author', 'otter-blocks' ) }</option>
													<option value="postMeta">{ __( 'Post Meta', 'otter-blocks' ) }</option>
												</optgroup>
											</select>
										</BaseControl>

										{ 'userRoles' === i.type && (
											<FormTokenField
												label={ __( 'User Roles', 'otter-blocks' ) }
												value={ i.roles }
												suggestions={ Object.keys( window.themeisleGutenberg.userRoles ) }
												onChange={ roles => changeRoles( roles, index, n ) }
												__experimentalExpandOnFocus={ true }
												__experimentalValidateInput={ newValue => Object.keys( window.themeisleGutenberg.userRoles ).includes( newValue ) }
											/>
										) }

										{ 'postAuthor' === i.type && (
											<FormTokenField
												label={ __( 'Post Authors', 'otter-blocks' ) }
												value={ i.authors }
												suggestions={ postAuthors }
												onChange={ authors => changeAuthors( authors, index, n ) }
												__experimentalExpandOnFocus={ true }
												__experimentalValidateInput={ newValue => postAuthors.includes( newValue ) }
											/>
										) }

										{ 'postMeta' === i.type && (
											<Fragment>
												<TextControl
													label={ __( 'Meta Key', 'otter-blocks' ) }
													help={ __( 'Key of the meta you want to compare.', 'otter-blocks' ) }
													placeholder={ __( '_meta_key', 'otter-blocks' ) }
													value={ i.meta_key }
													onChange={ e => changeValue( e, index, n, 'meta_key' ) }
												/>

												<SelectControl
													label={ __( 'Compare Operator', 'otter-blocks' ) }
													options={ [
														{
															value: 'is_true',
															label: __( 'Is True', 'otter-blocks' )
														},
														{
															value: 'is_false',
															label: __( 'Is False', 'otter-blocks' )
														},
														{
															value: 'is_empty',
															label: __( 'Is Empty', 'otter-blocks' )
														},
														{
															value: 'if_equals',
															label: __( 'If Equals', 'otter-blocks' )
														},
														{
															value: 'if_contains',
															label: __( 'If Contains', 'otter-blocks' )
														}
													] }
													value={ i.meta_compare }
													onChange={ e => changeValue( e, index, n, 'meta_compare' ) }
												/>

												{ ( 'if_equals' === i.meta_compare || 'if_contains' === i.meta_compare ) && (
													<TextControl
														label={ __( 'Meta Value', 'otter-blocks' ) }
														help={ __( 'Value of the meta to compare.', 'otter-blocks' ) }
														value={ i.meta_value }
														onChange={ e => changeValue( e, index, n, 'meta_value' ) }
													/>
												) }
											</Fragment>
										) }

										{ ( 'userRoles' === i.type || 'postAuthor' === i.type || 'postMeta' === i.type ) && (
											<SelectControl
												label={ __( 'If condition is true, the block should be:', 'otter-blocks' ) }
												options={ [
													{
														value: true,
														label: __( 'Visible', 'otter-blocks' )
													},
													{
														value: false,
														label: __( 'Hidden', 'otter-blocks' )
													}
												] }
												value={ i.visibility }
												onChange={ e => changeVisibility( e, index, n ) }
											/>
										) }

										<Button
											isLarge
											isDestructive
											className="wp-block-themeisle-blocks-conditions__add"
											onClick={ () => removeCondition( index, n ) }
										>
											{ __( 'Delete Condition', 'otter-blocks' ) }
										</Button>

										{ ( 1 < group.length && n !== group.length - 1 ) && (
											<Separator label={ __( 'AND', 'otter-blocks' ) } />
										) }
									</Fragment>
								) ) }

								<Button
									isSecondary
									isLarge
									className="wp-block-themeisle-blocks-conditions__add"
									onClick={ () => addNewCondition( index ) }
								>
									{ __( 'Add a New Condition', 'otter-blocks' ) }
								</Button>
							</PanelTab>

							{ ( 1 < attributes.otterConditions.length && index !== attributes.otterConditions.length - 1 ) && (
								<Separator label={ __( 'OR', 'otter-blocks' ) } />
							) }
						</Fragment>
					);
				}) }

				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-conditions__add"
					onClick={ addGroup }
				>
					{ __( 'Add Rule Group', 'otter-blocks' ) }
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export default Edit;
