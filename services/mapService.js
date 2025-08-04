export const mapService = {
    initMap: function(lat, lon, zoomLevel = 8) {
        if (this.mapInstance) {
            this.mapInstance.remove();
        }
        this.mapInstance = L.map("map").setView([lat, lon], zoomLevel);

        L.tileLayer(
            "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=7GdPQstJTIq4t7BSTEXo",
            {
                tileSize: 512,
                zoomOffset: -8,
                attribution: '&copy; <a href="https://www.maptiler.com">YUGESH</a>',
            }
        ).addTo(this.mapInstance);

        L.marker([lat, lon])
            .addTo(this.mapInstance)
            .bindPopup("Your approximate location")
            .openPopup();

        return this.mapInstance;
    },

    addMarkers: function(locations) {
        if (!this.mapInstance) return;
        
        locations.forEach(location => {
            if (location.lat && location.lon) {
                const marker = L.marker([location.lat, location.lon])
                    .addTo(this.mapInstance)
                    .bindPopup(`<b>${location.name}</b><br>${location.address}`);
            }
        });
    },

    removeAllMarkers: function() {
        if (!this.mapInstance) return;
        
        this.mapInstance.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                this.mapInstance.removeLayer(layer);
            }
        });
    }
};
