/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Button,
	ColorIndicator,
	Dropdown,
	RangeControl,
	SelectControl
} = wp.components;

const { withInstanceId } = wp.compose;

const { ColorPalette } = wp.blockEditor || wp.editor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

import GradientButton from './gradient-button.js';
import gradients from './gradients.js';

const GradientPickerControl = ({ label, instanceId, value, customGradient = true, onChange }) => {
	const id = `inspector-gradient-picker-control-${ instanceId }`;

	const onChangeValue = ({ firstColor = value.firstColor, firstLocation = value.firstLocation, secondColor = value.secondColor, secondLocation = value.secondLocation, type = value.type, angle = value.angle, position = value.position }) => {
		onChange( firstColor, firstLocation, secondColor, secondLocation, type, angle, position );
	};

	let direction;

	if ( 'linear' === value.type ) {
		direction = `${ value.angle }deg`;
	} else {
		direction = `at ${ value.position }`;
	}

	const background = `${ value.type }-gradient( ${ direction }, ${ value.firstColor || 'rgba( 0, 0, 0, 0 )' } ${ value.firstLocation }%, ${ value.secondColor || 'rgba( 0, 0, 0, 0 )' } ${ value.secondLocation }% )`;

	let showIndicator = gradients.some( gradient => ( gradient.firstColor === value.firstColor && gradient.secondColor === value.secondColor ) );

	return (
		<div
			id={ id }
			className="wp-block-themeisle-blocks-responsive-control"
		>
			<div className="components-base-control__field">
				{ label && (
					<div className="components-base-control__title">
						<label className="components-base-control__label">
							{ label }
							{ ! showIndicator && <ColorIndicator colorValue={ background } /> }
						</label>
					</div>
				) }

				<div className="wp-block-themeisle-blocks-responsive-control-presets">
					{ gradients.map( gradient => (
						<GradientButton
							title={ gradient.title }
							firstColor={ gradient.firstColor }
							secondColor={ gradient.secondColor }
							isSelected={ ( gradient.firstColor === value.firstColor && gradient.secondColor === value.secondColor ) }
							onChange={ onChange }
						/>
					) ) }

					<div className="wp-block-themeisle-blocks-responsive-control-custom-wrapper">
						{ customGradient && (
							<Dropdown
								className="wp-block-themeisle-blocks-responsive-control-dropdown-link-action"
								contentClassName="wp-block-themeisle-blocks-responsive-control-dropdown-content"
								renderToggle={ ({ isOpen, onToggle }) => (
									<Button
										aria-expanded={ isOpen }
										onClick={ onToggle }
										isLink
									>
										{ __( 'Custom Gradient' ) }
									</Button>
								) }
								renderContent={ () => (
									<Fragment>
										<p>{ __( 'First Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											clearable={ false }
											value={ value.firstColor }
											onChange={ e => onChangeValue({ firstColor: e }) }
										/>

										<RangeControl
											label={ __( 'Location' ) }
											value={ value.firstLocation }
											min={ 0 }
											max={ 100 }
											onChange={ e => onChangeValue({ firstLocation: e }) }
										/>

										<p>{ __( 'Second Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											clearable={ false }
											value={ value.secondColor }
											onChange={ e => onChangeValue({ secondColor: e }) }
										/>

										<RangeControl
											label={ __( 'Location' ) }
											value={ value.secondLocation }
											min={ 0 }
											max={ 100 }
											onChange={ e => onChangeValue({ secondLocation: e }) }
										/>

										<SelectControl
											label={ __( 'Type' ) }
											value={ value.type }
											options={ [
												{ label: 'Linear', value: 'linear' },
												{ label: 'Radial', value: 'radial' }
											] }
											onChange={ e => onChangeValue({ type: e }) }
										/>

										{ 'linear' === value.type ?
											<RangeControl
												label={ __( 'Angle' ) }
												value={ value.angle }
												min={ 0 }
												max={ 360 }
												onChange={ e => onChangeValue({ angle: e }) }
											/>	:
											<SelectControl
												label={ __( 'Position' ) }
												value={ value.position }
												options={ [
													{ label: 'Top Left', value: 'top left' },
													{ label: 'Top Center', value: 'top center' },
													{ label: 'Top Right', value: 'top right' },
													{ label: 'Center Left', value: 'center left' },
													{ label: 'Center Center', value: 'center center' },
													{ label: 'Center Right', value: 'center right' },
													{ label: 'Bottom Left', value: 'bottom left' },
													{ label: 'Bottom Center', value: 'bottom center' },
													{ label: 'Bottom Right', value: 'bottom right' }
												] }
												onChange={ e => onChangeValue({ position: e }) }
											/>
										}
									</Fragment>
								) }
							/>
						) }

						<Button
							className="wp-block-themeisle-blocks-responsive-control-clear"
							type="button"
							isSmall
							isDefault
							onClick={ () => onChange( '#ffffff', 0, '#ffffff', 100, 'linear', 90, 'center center' ) }
						>
							{ __( 'Clear' ) }
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withInstanceId( GradientPickerControl );
