/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Button,
	ButtonGroup,
	Icon
} = wp.components;

const { useInstanceId } = wp.compose;

/**
 * Internal dependencies
 */
import './editor.scss';

import { barcodeIcon } from '../../../../helpers/icons.js';

const BackgroundControl = ({
	label,
	backgroundType,
	changeBackgroundType
}) => {
	const instanceId = useInstanceId( BackgroundControl );

	const id = `inspector-background-control-${ instanceId }`;

	return (
		<div id={ id } className="components-base-control wp-block-themeisle-blocks-advanced-columns-background-control">
			<div className="components-base-control__field">
				<div className="components-base-control__title">
					<label className="components-base-control__label">{ label }</label>
					<ButtonGroup className="linking-controls">
						<Button
							icon={ 'admin-customizer' }
							label={ __( 'Color' ) }
							showTootlip={ true }
							isPrimary={ 'color' === backgroundType }
							onClick={ () => changeBackgroundType( 'color' ) }
						/>

						<Button
							icon={ 'format-image' }
							label={ __( 'Image' ) }
							showTootlip={ true }
							isPrimary={ 'image' === backgroundType }
							onClick={ () => changeBackgroundType( 'image' ) }
						/>

						<Button
							icon={ () => <Icon icon={ barcodeIcon } /> }
							label={ __( 'Gradient' ) }
							showTootlip={ true }
							isPrimary={ 'gradient' === backgroundType }
							onClick={ () => changeBackgroundType( 'gradient' ) }
						/>
					</ButtonGroup>
				</div>
			</div>
		</div>
	);
};

export default BackgroundControl;
