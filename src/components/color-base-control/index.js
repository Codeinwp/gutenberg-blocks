/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { ColorIndicator } = wp.components;

/**
* Internal dependencies
*/
import './editor.scss';

function ColorBaseControl({
	label,
	colorValue,
	className,
	children
}) {
	return (
		<div
			className={
				classnames(
					'components-base-control',
					'wp-block-themeisle-blocks-color-base-control',
					className
				)
			}
		>
			<div className="components-base-control__field">
				{ label &&
					<span className="components-base-control__label">
						{ label }

						{ colorValue && <ColorIndicator colorValue={ colorValue } /> }
					</span>
				}
				{ children }
			</div>
		</div>
	);
}

export default ColorBaseControl;
