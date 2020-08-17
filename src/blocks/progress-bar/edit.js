
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;
const { ResizableBox } = wp.components;
const { useRef } = wp.element;

import Inspector from './inspector.js';
import ProgressBarLibrary from './components/index.js';

const ProgressBar = ({ attributes, setAttributes, toggleSelection }) => {

	const percentageRef = useRef( null );

	const onTextChange = value => {
		setAttributes({ text: value });
	};

	const renderPercentage = value => {
		if ( percentageRef.current ) {
			percentageRef.current.innerHTML = value;
		}
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div className="wp-themeisle-block-progress-bar">
				<div className="wp-themeisle-block-progress-bar__content">
					<RichText
						tagName="p"
						className="wp-themeisle-block-progress-bar__title"
						placeholder={ __( 'Write a title…' ) }
						value={ attributes.text }
						onChange={ onTextChange }
						multiline={ false }
					/>

					{
						! attributes.hideValue && (
							<span ref={ percentageRef }>

							</span>
						)
					}

				</div>
				<ResizableBox
					size={ {
						height: attributes.height
					} }
					minHeight="20"
					enable={ {
						top: true,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes({
							height: parseInt( attributes.height + delta.height, 10 )
						});
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
					<div style={{ height: attributes.height }}>
						<ProgressBarLibrary type={ attributes.type } attributes={ attributes } getValue={ renderPercentage } />
					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default ProgressBar;
