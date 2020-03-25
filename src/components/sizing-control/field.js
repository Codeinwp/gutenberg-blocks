/**
 * WordPress dependencies
 */
const {
	Fragment,
	useRef
} = wp.element;

const Field = ({
	id,
	index,
	option,
	min,
	max,
	onChange
}) => {
	const fieldRef = useRef( null );

	return (
		<div className="wp-block-themeisle-blocks-sizing-control-item">
			{ index.disabled ? (
				<input
					type="number"
					disabled={ index.disabled }
					className="wp-block-themeisle-blocks-sizing-control-item-input"
					id={ `wp-block-themeisle-blocks-sizing-control-item-input-${ option }` }
				/>
			) : (
				<Fragment>
					<input
						type="number"
						className="wp-block-themeisle-blocks-sizing-control-item-input"
						id={ `wp-block-themeisle-blocks-sizing-control-item-input-${ option }-${ id }` }
						value={ index.value || '' }
						min={ min }
						max={ max }
						ref={ fieldRef }
						onChange={ e => onChange( index.type, parseInt( e.target.value ) ) }
					/>
				</Fragment>
			) }

			{ index.label && (
				<label
					className="wp-block-themeisle-blocks-sizing-control-item-label"
					htmlFor={ `wp-block-themeisle-blocks-sizing-control-item-input-${ option }-${ id }` }
				>
					{ index.label }
				</label>
			) }
		</div>
	);
};

export default Field;
