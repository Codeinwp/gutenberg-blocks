
import classname from 'classnames';


const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;
const { ResizableBox } = wp.components;

import Inspector from './inspector.js';

const ProgressBar = ({ attributes, setAttributes, toggleSelection }) => {

	const onTextChange = value => {
		setAttributes({ text: value });
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
					<span className="wp-themeisle-block-progress-bar__value">
						{
							attributes.hideValue && `${attributes.value}%`
						}
					</span>
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
					<div
						className='wp-themeisle-block-progress-bar__bar'
						style={{ backgroundColor: attributes.backgroundColor, borderRadius: `${attributes.borderRadius}px`, height: `${attributes.height}px` }}>
						<div
							className={
								classname( 'wp-themeisle-block-progress-bar__progress', { 'has-animation': attributes.animated }, { 'has-no-animation': ! attributes.animated })
							}
							style={{ backgroundColor: attributes.progressColor, '--width': `${attributes.value}%`, maxWidth: `${attributes.value}%`, borderRadius: `${attributes.borderRadius}px` }}>

						</div>
					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default ProgressBar;
