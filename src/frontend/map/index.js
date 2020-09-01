/**
 * Internal dependencies
 */

const domReady = wp.domReady;

domReady( () => {
	const markerIcon = L.icon({
		iconUrl: '../../../assets/map/marker-icon.png',
		iconSize: [ 25, 40 ]
	});

	let maps = [];
	maps = window.themeisleMaps;

	maps.forEach( map => {
		const mapContainer = document.getElementById( map.container );
		mapContainer.style.height = `${map.attributes.height}px`;

		const lMap = new L.Map( mapContainer, {
			center: {
				lat: map.attributes.latitude,
				lng: map.attributes.longitude
			},
			zoom: map.attributes.zoom
		});

		L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo( lMap );

		if ( map.attributes.markers && 0 < map.attributes.markers.length ) {
			map.attributes.markers.forEach( marker => {

				const mark = new L.marker([ marker.latitude, marker.longitude ], {icon: markerIcon}).addTo( lMap );

				if ( marker.title || marker.description ) {
					const contentString = `<div class="wp-block-themeisle-blocks-map-overview"><h6 class="wp-block-themeisle-blocks-map-overview-title">${marker.title}</h6><div class="wp-block-themeisle-blocks-map-overview-content">${marker.description ? `<p>${marker.description}</p>` : ''}</div></div>`;
					mark.bindPopup( contentString ).openPopup();
				}
			});
		}
	});

});

