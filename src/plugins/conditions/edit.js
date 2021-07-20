/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { isEmpty } from 'lodash';

import {
	Button,
	FormTokenField,
	PanelBody,
	SelectControl
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';

import { InspectorControls } from '@wordpress/block-editor';

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

	const addNewCondition = () => {
		const otterConditions = [ ...( attributes.otterConditions || [])  ];
		otterConditions.push({});
		setAttributes({ otterConditions });
	};

	const removeCondition = n => {
		let otterConditions = [ ...attributes.otterConditions  ];

		otterConditions.splice( n, 1 );

		if ( ! Boolean( otterConditions.length ) ) {
			otterConditions = undefined;
		}

		setAttributes({ otterConditions });
	};

	const changeCondition = ( value, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];

		let attrs = {};

		if ( 'userRoles' === value ) {
			attrs.visibility = true;
		}

		if ( 'none' === value ) {
			otterConditions[ key ] = {};
		} else {
			otterConditions[ key ] = {
				type: value,
				...attrs
			};
		}
		setAttributes({ otterConditions });
	};

	const changeRoles = ( value, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ key ].roles = value;
		setAttributes({ otterConditions });
	};

	const changeVisibility = ( value, key ) => {
		let otterConditions = [ ...attributes.otterConditions  ];
		otterConditions[ key ].visibility = value;
		setAttributes({ otterConditions });
	};

	const getConditions = n => {
		let otterConditions = [ ...attributes.otterConditions  ];
		if ( n ) {
			otterConditions.splice( n, 1 );
		}

		const conditions = [
			{
				value: 'none',
				label: __( 'Select a condition', 'otter-blocks' ),
				help: __( 'Select a condition to control the visibility of your block.', 'otter-blocks' )
			},
			{
				value: 'loggedInUser',
				label: __( 'Logged In Users', 'otter-blocks' ),
				help: __( 'The selected block will only be visible to logged-in users.' ),
				disabled: otterConditions.find( ( condition, i ) => ( 'loggedOutUser' === condition.type || 'userRoles'  === condition.type ) && n !== i )
			},
			{
				value: 'loggedOutUser',
				label: __( 'Logged Out Users', 'otter-blocks' ),
				help: __( 'The selected block will only be visible to logged-out users.' ),
				disabled: otterConditions.find( ( condition, i ) => ( 'loggedInUser' === condition.type || 'userRoles'  === condition.type ) && n !== i )
			},
			{
				value: 'userRoles',
				label: __( 'User Roles', 'otter-blocks' ),
				help: __( 'The selected block will only be visible to defined user roles.' ),
				disabled: otterConditions.find( ( condition, i ) => ( 'loggedOutUser' === condition.type || 'loggedOutUser' === condition.type ) && n !== i )
			}
		];

		return conditions;
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Visibility Conditions', 'otter-blocks' ) }
				initialOpen={ false }
			>
				{ __( 'Control the visibility of your blocks based on the following conditions.', 'otter-blocks' ) }

				{ attributes.otterConditions && attributes.otterConditions.map( ( i, n ) => (
					<PanelTab
						label={ getConditions().find( condition => condition.value === ( i.type || 'none' ) ).label }
						onDelete={ () => removeCondition( n ) }
					>
						<SelectControl
							label={ __( 'Condition', 'otter-blocks' ) }
							help={ getConditions().find( condition => condition.value === ( i.type || 'none' ) ).help }
							options={ getConditions( n ) }
							value={ i.type || '' }
							onChange={ e => changeCondition( e, n ) }
						/>

						{ 'userRoles' === i.type && (
							<FormTokenField
								label={ __( 'User Roles', 'otter-blocks' ) }
								value={ i.roles }
								suggestions={ Object.keys( window.themeisleGutenberg.userRoles ) }
								onChange={ roles => changeRoles( roles, n ) }
								__experimentalExpandOnFocus={ true }
								__experimentalValidateInput={ newValue => Object.keys( window.themeisleGutenberg.userRoles ).includes( newValue ) }
							/>
						) }

						{ 'userRoles' === i.type && (
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
								onChange={ e => changeVisibility( e, n ) }
							/>
						) }
					</PanelTab>
				) ) }

				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-conditions__add"
					onClick={ addNewCondition }
				>
					{ __( 'Add a New Condition', 'otter-blocks' ) }
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export default Edit;
