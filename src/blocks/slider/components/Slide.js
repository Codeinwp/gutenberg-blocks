/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { RichText } = wp.blockEditor || wp.editor;

const { IconButton } = wp.components;

const {
	Component,
	Fragment
} = wp.element;

class Slide extends Component {
	render() {
		return (
			<div
				className={ classnames(
					'wp-block-themeisle-blocks-slider-item-wrapper glide__slide',
					{ 'is-selected': this.props.isSelected }
				) }
				tabIndex="0"
				onClick={ this.props.onSelect }
				onFocus={ this.props.onSelect }
			>
				<figure>
					<img
						key={ this.props.image.id }
						className="wp-block-themeisle-blocks-slider-item"
						src={ this.props.image.url }
						alt={ this.props.image.alt }
						title={ this.props.image.alt }
						data-id={ this.props.image.id }
					/>

					{ this.props.isSelected && (
						<Fragment>
							<div className="wp-block-themeisle-blocks-slider-item-move-menu">
								<IconButton
									icon="arrow-left-alt2"
									onClick={ this.props.isFirstItem ? undefined : () => this.props.onMoveBackward( this.props.index ) }
									className="wp-block-themeisle-blocks-slider-item-move-backward"
									label={ __( 'Move image backward' ) }
									aria-disabled={ this.props.isFirstItem }
									disabled={ ! this.props.isSelected }
								/>

								<IconButton
									icon="arrow-right-alt2"
									onClick={ this.props.isLastItem ? undefined : () => this.props.onMoveForward( this.props.index ) }
									className="wp-block-themeisle-blocks-slider-item-move-forward"
									label={ __( 'Move image forward' ) }
									aria-disabled={ this.props.isLastItem }
									disabled={ ! this.props.isSelected }
								/>
							</div>


							<div className="wp-block-themeisle-blocks-slider-item-delete-menu">
								<IconButton
									icon="no-alt"
									onClick={ () => this.props.onRemoveImage( this.props.index ) }
									className="wp-block-themeisle-blocks-slider-item-delete"
									label={ __( 'Remove image' ) }
								/>
							</div>
						</Fragment>
					) }

					{ ( this.props.isSelected || ! RichText.isEmpty( this.props.image.caption ) ) && (
						<RichText
							tagName="figcaption"
							placeholder={ this.props.isSelected ? __( 'Write caption…' ) : null }
							value={ this.props.image.caption }
							onChange={ e => this.props.changeCaption( e, this.props.index ) }
							multiline={ false }
						/>
					) }
				</figure>
			</div>
		);
	}
}

export default Slide;
