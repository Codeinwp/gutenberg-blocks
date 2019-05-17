/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Button,
	Dashicon,
	Icon,
	Path,
	Placeholder,
	SVG,
	Tooltip
} = wp.components;

const { Component } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

import { columnsIcon } from '../../../../helpers/icons.js';

import Library from './library.js';

class Onboarding extends Component {
	constructor() {
		super( ...arguments );

		this.closeModal = this.closeModal.bind( this );

		this.state = {
			isLibraryOpen: false
		};
	}

	closeModal() {
		this.setState({ isLibraryOpen: false });
	}

	render() {
		return (
			<Placeholder
				label={ __( 'Select Layout' ) }
				icon={ <Icon icon={ columnsIcon } /> }
				className="themeisle-onboarding-component"
			>
				<div className="themeisle-layout-picker">
					<Tooltip text={ __( 'Single Row' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 1, 'equal' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M100,0V50H0V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Equal' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 2, 'equal' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M49,0V50H0V0Z M100,0V50H51V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( '1:2' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 2, 'oneTwo' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M32.6667,0V50H0V0Z M100,0V50H34.6667V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( '2:1' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 2, 'twoOne' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M65.3333,0V50H0V0Z M100,0V50H67.3333V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Equal' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 3, 'equal' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M32,0V50H0V0Z M66,0V50H34V0Z M100,0V50H68V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( '1:1:2' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 3, 'oneOneTwo' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M24,0V50H0V0Z M50,0V50H26V0Z M100,0V50H52V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( '2:1:1' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 3, 'twoOneOne' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M48,0V50H0V0Z M74,0V50H50V0Z M100,0V50H76V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( '1:2:1' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 3, 'oneTwoOne' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M24,0V50H0V0Z M74,0V50H26V0Z M100,0V50H76V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( '1:3:1' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 3, 'oneThreeOne' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M20,0V50H0V0Z M78,0V50H22V0Z M100,0V50H80V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Equal' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 4, 'equal' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M23.5,0V50H0V0Z M49,0V50H25.5V0Z M74.5,0V50H51V0Z M100,0V50H76.5V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Equal' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 5, 'equal' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M18.4,0V50H0V0Z M38.8,0V50H20.4V0Z M59.2,0V50H40.8V0Z M79.6,0V50H61.2V0Z M100,0V50H81.6V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Equal' ) } >
						<Button
							className="wp-block-themeisle-blocks-advanced-column-layout"
							onClick={ () => this.props.setupColumns( 6, 'equal' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M15,0V50H0V0Z M32,0V50H17V0Z M49,0V50H34V0Z M66,0V50H51V0Z M83,0V50H68V0Z M100,0V50H85V0Z"></Path>
							</SVG>
						</Button>
					</Tooltip>
				</div>

				<Tooltip text={ __( 'Open Template Library' ) } >
					<Button
						isPrimary
						isLarge
						className="themeisle-template-library"
						onClick={ () => this.setState({ isLibraryOpen: true }) }
					>
						<Dashicon icon="category"/>
						{ __( 'Template Library' ) }
					</Button>

					{ this.state.isLibraryOpen && <Library clientId={ this.props.clientId } close={ this.closeModal } /> }
				</Tooltip>
			</Placeholder>
		);
	}
}

export default Onboarding;
