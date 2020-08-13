/**
 * Internal dependencies
 */

const initMapScripts = () => {
	let maps = [];
	maps = window.themeisleMaps;

	maps.forEach( map => {
		const mapContainer = document.getElementById( map.container );
		mapContainer.style.height = `${map.attributes.height}px`;

		const leafletMap = L.Map( mapContainer, {
			center: {
				lat: map.attributes.latitude,
				lng: map.attributes.longitude
			},
			zoom: map.attributes.zoom,
			zoomControl: map.attributes.zoomControl,
			dragging: map.attributes.draggable,
			fullscreenControl: map.attributes.fullscreenControl
		});

		if ( map.attributes.markers && 0 < map.attributes.markers.length ) {
			map.attributes.markers.forEach( marker => {

				L.marker([ marker.latitude, marker.longitude ], { icon: marker.icon || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }).addTo( leafletMap );

				if ( marker.title || marker.description ) {
					const contentString = `<div class="wp-block-themeisle-blocks-map-overview"><h6 class="wp-block-themeisle-blocks-map-overview-title">${marker.title}</h6><div class="wp-block-themeisle-blocks-map-overview-content">${marker.description ? `<p>${marker.description}</p>` : ''}</div></div>`;
					marker.bindPopup( contentString ).openPopup();
				}
			});
		}
	});

};

window.initMapScripts = initMapScripts;
