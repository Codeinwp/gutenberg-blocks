/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { startCase, toLower } = lodash;

const { __ } = wp.i18n;

const { useInstanceId } = wp.compose;

const { Button, BaseControl, Dropdown, MenuGroup, MenuItem, SelectControl, TextControl } = wp.components;

const { useEffect, useState } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const GoogleFontsControl = ({
	label,
	value,
	valueVariant,
	valueStyle,
	valueTransform,
	isSelect = false,
	onChangeFontFamily,
	onChangeFontVariant,
	onChangeFontStyle,
	onChangeTextTransform,
}) => {
	const instanceId = useInstanceId(GoogleFontsControl);

	useEffect(() => {
		fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyClGdkPJ1BvgLOol5JAkQY4Mv2lkLYu00k')
			.then((blob) => blob.json())
			.then((data) => {
				setFonts(data.items);
				if (value) {
					data.items.find((i) => {
						if (value === i.family) {
							const variants = i.variants
								.filter((o) => false === o.includes('italic'))
								.map((o) => {
									return (o = {
										label: startCase(toLower(o)),
										value: o,
									});
								});
							return setVariants(variants);
						}
					});
				}
			});
	}, []);

	const [fonts, setFonts] = useState(null);
	const [variants, setVariants] = useState(null);
	const [search, setSearch] = useState('');

	const id = `inspector-google-fonts-control-${instanceId}`;

	return (
		<div className="wp-block-themeisle-blocks-google-fonts-control">
			<BaseControl label={label} id={id}>
				{null !== fonts ? (
					isSelect ? (
						<SelectControl
							value={value || ''}
							id={id}
							options={[
								{
									label: __('Default'),
									value: '',
								},
								...fonts.map((i) => {
									return (i = {
										label: i.family,
										value: i.family,
									});
								}),
							]}
							onChange={(e) => {
								let variants = [];

								if ('' === e) {
									variants = [
										{
											label: __('Regular'),
											value: 'regular',
										},
										{
											label: __('Italic'),
											value: 'italic',
										},
									];
									onChangeFontFamily(undefined);
									setVariants(variants);
									return;
								}

								onChangeFontFamily(e);

								const font = fonts.find((i) => e === i.family);

								variants = font.variants
									.filter((o) => false === o.includes('italic'))
									.map((o) => {
										return (o = {
											label: startCase(toLower(o)),
											value: o,
										});
									});

								setVariants(variants);
							}}
						/>
					) : (
						<Dropdown
							contentClassName="wp-block-themeisle-blocks-google-fonts-popover"
							position="bottom center"
							renderToggle={({ isOpen, onToggle }) => (
								<Button
									isLarge
									className="wp-block-themeisle-blocks-google-fonts-button"
									id={id}
									onClick={onToggle}
									aria-expanded={isOpen}
								>
									{value ? value : __('Select Font Family')}
								</Button>
							)}
							renderContent={({ onToggle }) => (
								<MenuGroup label={__('Google Fonts')}>
									<TextControl value={search} onChange={(e) => setSearch(e)} />

									<div className="components-popover__items">
										<MenuItem
											onClick={() => {
												onToggle();
												onChangeFontFamily(undefined);
												setVariants([]);
												setSearch('');
											}}
										>
											{__('Default')}
										</MenuItem>

										{fonts.map((i) => {
											if (!search || i.family.toLowerCase().includes(search.toLowerCase())) {
												return (
													<MenuItem
														className={classnames({ 'is-selected': i.family === value })}
														onClick={() => {
															onToggle();
															onChangeFontFamily(i.family);

															const variants = i.variants
																.filter((o) => false === o.includes('italic'))
																.map((o) => {
																	return (o = {
																		label: startCase(toLower(o)),
																		value: o,
																	});
																});

															setVariants(variants);
															setSearch('');
														}}
													>
														{i.family}
													</MenuItem>
												);
											}
										})}
									</div>
								</MenuGroup>
							)}
						/>
					)
				) : (
					__('Loading…')
				)}
			</BaseControl>

			{variants && (
				<SelectControl
					label={__('Font Width')}
					value={valueVariant || 'regular'}
					options={variants}
					onChange={onChangeFontVariant}
				/>
			)}

			<SelectControl
				label={__('Font Style')}
				value={valueStyle}
				options={[
					{
						label: __('Regular'),
						value: 'normal',
					},
					{
						label: __('Italic'),
						value: 'italic',
					},
				]}
				onChange={onChangeFontStyle}
			/>

			<SelectControl
				label={__('Font Transform')}
				value={valueTransform}
				options={[
					{
						label: __('Default'),
						value: 'none',
					},
					{
						label: __('Uppercase'),
						value: 'uppercase',
					},
					{
						label: __('Lowercase'),
						value: 'lowercase',
					},
					{
						label: __('Capitalize'),
						value: 'capitalize',
					},
				]}
				onChange={onChangeTextTransform}
			/>
		</div>
	);
};

export default GoogleFontsControl;
