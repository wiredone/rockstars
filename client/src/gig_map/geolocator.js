var GeoLocator = function(map) {
  this.map = map;
  this.findCoords = function(callback) {
    navigator.geolocation.getCurrentPosition(function(position) {
      coords = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.map.resetCenter(coords);
      callback(coords);
    }.bind(this));
  };
};

module.exports = GeoLocator;