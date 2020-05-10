/**
 * External dependencies
 */
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

/**
 * WordPress dependencies
 */
const { apiFetch } = wp;

const { Modal } = wp.components;

const { compose } = wp.compose;

const {
	withSelect,
	withDispatch
} = wp.data;

const {
	useEffect,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';
import Header from './components/header.js';
import Notices from './components/notices.js';
import TemplatesList from './components/templates-list.js';

const Library = ({
	close,
	availableBlocks,
	importBlocks
}) => {
	useEffect( () => {
		const fetchData = async() => {
			let data = await apiFetch({ path: 'themeisle-gutenberg-blocks/v1/fetch_templates' });

			let blocksCategories = [];
			let templateCategories = [];

			data.map( i => {
				if ( i.categories && i.template_url ) {
					if ( 'block' === i.type ) {
						i.categories.map( o => {
							blocksCategories.push( o );
						});
					}

					if ( 'template' === i.type ) {
						i.categories.map( o => {
							templateCategories.push( o );
						});
					}
				}
			});

			blocksCategories = blocksCategories.filter( ( item, i, ar ) => ar.indexOf( item ) === i ).sort();
			templateCategories = templateCategories.filter( ( item, i, ar ) => ar.indexOf( item ) === i ).sort();

			setBlocksCategories( blocksCategories );
			setTemplateCategories( templateCategories );
			setData( data );
			setLoaded( true );
		};

		fetchData();
	}, []);

	const [ tab, setTab ] = useState( 'block' );
	const [ isLoaded, setLoaded ] = useState( false );
	const [ isError, setError ] = useState( false );
	const [ isMissing, setMissing ] = useState( false );
	const [ selectedCategory, setSelectedCategory ] = useState( 'all' );
	const [ search, setSearch ] = useState( '' );
	const [ blocksCategories, setBlocksCategories ] = useState([]);
	const [ templateCategories, setTemplateCategories ] = useState([]);
	const [ data, setData ] = useState([]);
	const [ preview, setPreview ] = useState( false );
	const [ selectedTemplate, setSelectedTemplate ] = useState( null );
	const [ selectedTemplateContent, setSelectedTemplateContent ] = useState( null );
	const [ missingBlocks, setMissingBlocks ] = useState([]);

	const changeTab = value => {
		setTab( value );
		setSelectedCategory( 'all' );
		setSearch( '' );
	};

	const importPreview = async( template = null ) => {
		setLoaded( false );
		let data = await apiFetch({ path: `themeisle-gutenberg-blocks/v1/import_template?url=${ template.template_url }` });
		setSelectedTemplate( template );
		setSelectedTemplateContent( data );
		setLoaded( true );
		setPreview( ! preview );
	};

	const changeClientId = data => {
		if ( Array.isArray( data ) ) {
			data.map( i => changeClientId( i ) );
		} else if ( 'object' === typeof data ) {
			Object.keys( data ).map( k => {
				if ( 'clientId' === k ) {
					data[k] = uuidv4();
				}

				if ( 'innerBlocks' === k ) {
					data[k].map( i => {
						changeClientId( i );
					});
				}
			});
		}

		return data;
	};

	const validateBlocks = data => {
		let status = false;
		let missingBlocks = [];

		if ( Array.isArray( data ) ) {
			data.map( i => validateBlocks( i ) );
		} else if ( 'object' === typeof data ) {
			Object.keys( data ).some( k => {
				if ( 'name' === k ) {
					const exists = availableBlocks.find( i => {
						return i.name === data.name;
					});

					if ( undefined === exists ) {
						missingBlocks.push( data.name );
						status = true;
					}
				}

				if ( 'innerBlocks' === k ) {
					data[k].map( i => validateBlocks( i  ) );
				}
			});
		}

		missingBlocks = missingBlocks
			.concat( missingBlocks )
			.filter( ( v, i, a ) => a.indexOf( v ) === i );

		setMissingBlocks( missingBlocks );

		return status;
	};

	const importTemplate = async url => {
		setPreview( false );
		setLoaded( false );
		setMissingBlocks([]);

		let data = await apiFetch({ path: `themeisle-gutenberg-blocks/v1/import_template?url=${ url }` });

		data = changeClientId( data );

		if ( null !== data ) {
			setLoaded( true );

			if ( ! validateBlocks( data ) ) {
				importBlocks( data );
			} else {
				setMissing( true );
			}
		} else {
			setLoaded( true );
			setError( true );
		}
	};

	return (
		<Modal
			className={ classnames(
				'wp-block-themeisle-library-modal',
				{ 'is-preview': preview }
			) }
			onRequestClose={ close }
			isDismissable={ false }
			shouldCloseOnClickOutside={ false }
		>
			<Header
				preview={ preview }
				tab={ tab }
				changeTab={ changeTab }
				blocksCategories={ blocksCategories }
				templateCategories={ templateCategories }
				selectedTemplate={ selectedTemplate }
				selectedCategory={ selectedCategory }
				search={ search }
				setPreview={ setPreview }
				close={ close }
				importTemplate={ importTemplate }
				selectCategory={ e => setSelectedCategory( e ) }
				changeSearch={ e => setSearch( e ) }
			/>

			<Notices
				isError={ isError }
				isMissing={ isMissing }
				missingBlocks={ missingBlocks }
				removeError={ () => setError( false ) }
				removeMissing={ () => setMissing( false ) }
			/>

			<TemplatesList
				preview={ preview }
				isLoaded={ isLoaded }
				data={ data }
				tab={ tab }
				selectedTemplateContent={ selectedTemplateContent }
				selectedCategory={ selectedCategory }
				search={ search }
				importPreview={ importPreview }
				importTemplate={ importTemplate }
			/>
		</Modal>
	);
};

export default compose(
	withSelect( ( select, { clientId }) => {
		const { getBlock } = select( 'core/block-editor' );
		const { getBlockTypes } = select( 'core/blocks' );
		const block = getBlock( clientId );
		const availableBlocks = getBlockTypes();
		return {
			block,
			availableBlocks
		};
	}),

	withDispatch( ( dispatch, { block }) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' );
		return {
			importBlocks: ( content ) => replaceBlocks(
				block.clientId,
				content
			)
		};
	})
)( Library );
