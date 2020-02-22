/**
 * WordPress dependencies
 */
const {
	Popover,
	RangeControl
} = wp.components;

const {
	Fragment,
	useRef,
	useState
} = wp.element;

const Field = ({
	id,
	index,
	option,
	min,
	max,
	onChange
}) => {
	const [ isOpen, setOpen ] = useState( false );

	const fieldRef = useRef( null );

	const onClose = () => {
		if ( ! fieldRef.current.contains( document.activeElement ) ) {
			setOpen( false );
		}
	};

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
						onFocus={  () => setOpen( ! isOpen )  }
						onChange={ e => onChange( index.type, parseInt( e.target.value ) ) }
					/>

					{ isOpen && (
						<Popover onFocusOutside={ onClose }>
							<div className="wp-block-themeisle-blocks-sizing-control-overlay">
								<RangeControl
									value={ index.value }
									initialPosition={ index.value }
									beforeIcon="minus"
									afterIcon="plus"
									min={ min }
									max={ max }
									onChange={ e => onChange( index.type, e ) }
								/>
							</div>
						</Popover>
					) }
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
