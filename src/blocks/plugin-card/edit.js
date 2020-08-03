/**
 * WordPress dependencies
 */
const { Disabled } = wp.components;

const ServerSideRender = wp.serverSideRender;

const {
	Fragment,
	useState
} = wp.element;

const { omit } = lodash;

/**
 * Internal dependencies
 */
import Placeholder from './placeholder.js';
import Controls from './controls.js';

const Edit = ({
	attributes,
	setAttributes,
	className
}) => {
	const [ hasError, setError ] = useState( false );

	if ( ! attributes.slug ) {
		return (
			<Placeholder
				attributes={ attributes }
				setAttributes={ setAttributes }
				hasError={ hasError }
				setError={ setError }
				className={ className }
			/>
		);
	}

	return (
		<Fragment>
			<Controls/>

			<Disabled>
				<ServerSideRender
					block="themeisle-blocks/plugin-cards"
					attributes={ { ...omit( attributes, [ 'className' ]) } }
				/>
			</Disabled>
		</Fragment>
	);
};

export default Edit;
