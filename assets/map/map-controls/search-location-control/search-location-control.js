(function () {

    L.Layer.Search = L.Layer.extend({
        options: {
            allowMultipleResults: true,
            title: 'Location Search',
            wrapperStyle: 'wp-block-themeisle-blocks-map-search-wrapper',
            suggestionGroupStyle: 'wp-block-themeisle-blocks-map-search-results',
            selectedStyle: 'wp-block-themeisle-blocks-map-search-result'
        },
        initialize: function (options) {
            // this demo only supports one provider
            if (!options.providers) {
                options.providers = [L.esri.Geocoding.arcgisOnlineProvider()];
            }

            options.zoomToResult=true;
            options.useMapBounds=false;

            L.Util.setOptions(this, options);

            // instantiate the underlying class and pass along options
            this._geosearchCore = L.esri.Geocoding.geosearchCore(this, options);
            this._geosearchCore.addEventParent(this);

            this._geosearchCore._pendingSuggestions = [];

            // bubble provider events up to the control
            this._geosearchCore._providers[0].addEventParent(this);
        },

        _renderSuggestions: function (suggestions) {
            var nodes = [];
            var list;
            this._suggestions.style.display = 'block';

            for (var i = 0; i < suggestions.length; i++) {
                var suggestion = suggestions[i];

                if (!list) {
                    list = L.DomUtil.create('ul', null, suggestion.provider._contentsElement);
                    list.style.display = 'block';
                }

                var suggestionItem = L.DomUtil.create('li', 'wp-block-themeisle-blocks-map-geocoder-control-suggestion', list);
                suggestionItem.innerHTML = suggestion.text;
            }

            var elements=document.getElementsByClassName( 'wp-block-themeisle-blocks-map-search-no-results' );
            if (elements.length){
                elements[0].remove();
            }

            if(! suggestions.length){
                var noResults = L.DomUtil.create('div', 'wp-block-themeisle-blocks-map-search-no-results', this._input.parentNode);
                noResults.innerHTML = 'No results found. Try searching for something else or in a different area.'
            }

            nodes.push(list);

            return nodes;
        },

        clear: function () {
            this._clearAllSuggestions();
        },

        _clearAllSuggestions: function () {
            this._suggestions.style.display = 'none';

            for (var i = 0; i < this.options.providers.length; i++) {
                this._clearProviderSuggestions(this.options.providers[i]);
            }
        },

        _clearProviderSuggestions: function (provider) {
            provider._contentsElement.innerHTML = '';
        },

        _finalizeSuggestions: function (activeRequests, suggestionsLength) {
            // check if all requests are finished to remove the loading indicator
            if (!activeRequests) {
                L.DomUtil.removeClass(this._input, 'geocoder-control-loading');

                // also check if there were 0 total suggest results to clear the parent suggestions element
                // otherwise its display value may be "block" instead of "none"
                if (!suggestionsLength) {
                    this._clearAllSuggestions();
                }
            }
        },

         _changeMarkerLocation: function (location, latlng) {
            
            if ( this.options.markerId ){
                this.options.changeMarkerProp( this.options.markerId, 'location', location );
                this.options.changeMarkerProp( this.options.markerId, 'latitude', latlng.lat );
                this.options.changeMarkerProp( this.options.markerId, 'longitude', latlng.lng );
            } 

            if ( this.options.setLocation ){
                this.options.setLocation(location);
                this.options.setLatitude(latlng.lat);
                this.options.setLongitude(latlng.lng);
            }
        }
        , 

        onAdd: function (map, _changeMarkerLocation) {
            var that = this;
            this._map = map;
            L.esri.Util.setEsriAttribution(map);

            this._input = document.getElementById(this.options.inputTag);
            let inputValue = this._input.value ? this._input.value : this.options.inputValue? this.options.inputValue: !this.options.placeholder ? 'Statue of Liberty, New York, NY, 10004, USA' :''
            this._input.value = inputValue;

            // create a wrapper div around the input
            this._wrapper = document.createElement('div');

            L.DomUtil.addClass(this._wrapper, this.options.wrapperStyle);

            this._input.parentNode.insertBefore(this._wrapper, this._input);
            this._wrapper.appendChild(this._input);

            this._input.title = this.options.title;

            // create dom node for suggestions and place it below the input
            this._suggestions = document.createElement('div');
            L.DomUtil.addClass(this._suggestions, this.options.suggestionGroupStyle);

            // create a child contents container element for each provider inside of this._suggestions
            // to maintain the configured order of providers for suggested results
            for (var i = 0; i < this.options.providers.length; i++) {
                this.options.providers[i]._contentsElement = L.DomUtil.create('div', null, this._suggestions);
            }

            this._input.parentNode.insertBefore(this._suggestions, null);

            L.DomEvent.addListener(this._suggestions, 'mousedown', function (e) {
                var suggestionItem = e.target || e.srcElement;
                L.esri.Geocoding.geocode().text(suggestionItem.innerHTML).run(function (err, results) {
                    if (err) {
                        return;
                    }
                    myresults=results.results[0];


                    map.panTo(results.results[0].latlng, map.getZoom>9? map.getZoom: 10);
                    that._changeMarkerLocation(suggestionItem.innerHTML, results.results[0].latlng);
                });
                //this._changeMarkerLocation(map);

                this._input.value=suggestionItem.innerHTML;
                this.clear();
            }, this);



            L.DomEvent.addListener(this._input, 'keydown', function (e) {
                for (var x = 0; x < this._geosearchCore._pendingSuggestions.length; x++) {
                    var request = this._geosearchCore._pendingSuggestions[x];
                    if (request && request.abort && !request.id) {
                        request.abort();
                    }
                }
            }, this);

            L.DomEvent.addListener(this._input, 'keyup', L.Util.throttle(function (e) {
                var key = e.which || e.keyCode;
                var text = (e.target || e.srcElement).value;

                var elements = document.getElementsByClassName('wp-block-themeisle-blocks-map-search-no-results');
                if (elements.length) {
                    elements[0].remove();
                }

                // require at least 2 characters for suggestions
                if (text.length < 2) {
                    this._lastValue = this._input.value;
                    this._clearAllSuggestions();
                    return;
                }

                // if this is the escape key it will clear the input so clear suggestions
                if (key === 27) {
                    this._clearAllSuggestions();
                    return;
                }

                // if this is NOT the up/down arrows or enter make a suggestion
                if (key !== 13 && key !== 38 && key !== 40) {
                    if (this._input.value !== this._lastValue) {
                        this._lastValue = this._input.value;
                        this._geosearchCore._suggest(text);
                    }
                }
            }, 50, this), this);
        }
    });

    L.Layer.search = function (options) {
        return new L.Layer.Search(options);
    }

})();