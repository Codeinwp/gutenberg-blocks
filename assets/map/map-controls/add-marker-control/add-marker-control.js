(function () {

    L.Control.AddMarker = L.Control.extend({
        options: {
            position: 'bottomleft',
            title: 'Add marker'
        },
        onAdd: function (map) {
            var className = 'wp-block-themeisle-blocks-map-add-marker-button', container, content = '';
            this.isselecting=false;
            container = L.DomUtil.create('div', 'leaflet-bar');

            if (this.options.content) {
                content = this.options.content;
            } else {
                className += ' addMarker-icon';
            }

            this.state=false;

            this._createButton(this.options.title, className, content, container, this.options.fnct, this);
            return container;
        },

        onRemove: function (map) {
            L.DomEvent
                .off(this.link, 'click', L.DomEvent.stopPropagation)
                .off(this.link, 'click', L.DomEvent.preventDefault)
                .off(this.link, 'click', selectMarker, this);
        },

        _createButton: function (title, className, content, container, fn, context){
            this.link = L.DomUtil.create('a', className, container);
            this.link.href = '#';
            this.link.title = title;
            this.link.innerHTML = content;

            this.link.setAttribute('role', 'button');
            this.link.setAttribute('aria-label', title);

            L.DomEvent
                .on(this.link, 'click', L.DomEvent.stopPropagation)
                .on(this.link, 'click', L.DomEvent.preventDefault)
                .on(this.link, 'click', fn);
        }
    });

    L.control.addMarker = function (options) {
        return new L.Control.AddMarker(options);
    }

})();