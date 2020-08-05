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
	const [ showEdit, setShowEdit ] = useState( ! attributes.slug );

	if ( ! attributes.slug || showEdit ) {
		return (
			<Placeholder
				attributes={ attributes }
				setAttributes={ setAttributes }
				hasError={ hasError }
				setError={ setError }
				setShowEdit={ setShowEdit }
				className={ className }
			/>
		);
	}

	return (
		<Fragment>
			<Controls setShowEdit={ setShowEdit }/>

			<Disabled>
				<ServerSideRender
					block="themeisle-blocks/plugin-cards"
					className={ attributes.className }
					attributes={ { ...omit( attributes, [ 'customCSS', 'hasCustomCSS', 'className' ]) } }
				/>
			</Disabled>
		</Fragment>
	);
};

export default Edit;
