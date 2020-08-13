const attributes = {
	id: {
		type: 'string'
	},
	style: {
		type: 'string',
		default: 'Topographic'
	},
	styleUrl: {
		type: 'string',
		default: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
	},
	styleAttribution: {
		type: 'string',
		default: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
	},
	location: {
		type: 'string',
		default: 'Statue of Liberty, New York, NY, 10004, USA'
	},
	latitude: {
		type: 'number',
		default: 40.68924563540814
	},
	longitude: {
		type: 'number',
		default: -74.04443979263307
	},
	zoom: {
		type: 'number',
		default: 15
	},
	maxZoom: {
		type: 'number',
		default: 19
	},
	height: {
		type: 'number',
		default: 400
	},
	draggable: {
		type: 'boolean',
		default: true
	},
	zoomControl: {
		type: 'boolean',
		default: true
	},
	fullscreenControl: {
		type: 'boolean',
		default: true
	},
	markers: {
		type: 'array',
		default: []
	}
};

export default attributes;
