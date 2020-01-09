/**
 * WordPress dependencies
 */
const {
	Path,
	SVG
} = wp.components;

const { Fragment } = wp.element;

const SliderControls = ({ attributes }) => {
	return (
		<Fragment>
			<div
				className="glide__arrows"
				data-glide-el="controls"
			>
				<button
					className="glide__arrow glide__arrow--left"
					data-glide-dir="<"
				>
					<SVG
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 100 100"
					>
						<Path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></Path>
					</SVG>
				</button>
				<button
					className="glide__arrow glide__arrow--right"
					data-glide-dir=">"
				>
					<SVG
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 100 100"
					>
						<Path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></Path>
					</SVG>
				</button>
			</div>

			<div
				className="glide__bullets"
				data-glide-el="controls[nav]"
			>
				{ attributes.images.map( ( image, index ) => (
					<button
						className="glide__bullet"
						data-glide-dir={ `=${ index }` }
					>
					</button>
				) ) }
			</div>
		</Fragment>
	);
};

export default SliderControls;
