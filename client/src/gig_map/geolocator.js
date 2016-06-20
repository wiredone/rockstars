var GeoLocator = function(map) {
  this.map = map;
  this.setMapCenter = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      coords = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.map.resetCenter(coords);
    }.bind(this));
  };
};

module.exports = GeoLocator;