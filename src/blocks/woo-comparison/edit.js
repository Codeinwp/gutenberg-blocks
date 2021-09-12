/**
 * WordPress dependencies
 */
import { Disabled } from '@wordpress/components';

import {
	Fragment,
	useEffect,
	useState
} from '@wordpress/element';

import ServerSideRender from '@wordpress/server-side-render';

/**
  * Internal dependencies
  */
import defaultAttributes from './attributes.js';
import Placeholder from './placeholder.js';
import Controls from './controls.js';
import { blockInit } from '../../helpers/block-utility.js';

const Edit = ({
	attributes,
	setAttributes,
	clientId
}) => {
	useEffect( () => {
		if ( Boolean( attributes.products.length ) ) {
			setEditing( false );
		}
	}, []);

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	const [ isEditing, setEditing ] = useState( true );

	if ( isEditing ) {
		return (
			<Placeholder
				attributes={ attributes }
				setAttributes={ setAttributes }
				onComplete={ () => setEditing( false ) }
			/>
		);
	}

	return (
		<Fragment>
			<Controls onEdit={ () => setEditing( true ) } />

			<Disabled>
				<ServerSideRender
					block="themeisle-blocks/woo-comparison"
					attributes={ { ...attributes } }
				/>
			</Disabled>
		</Fragment>
	);
};

export default Edit;
