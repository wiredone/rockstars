var _ = require("lodash");

var CityGeocoder = function() {
  this.geocoder = new google.maps.Geocoder;
  this.getCity = function(event, city, callback) {
    this.geocoder.geocode({"address": city}, function(results, status) {
      if (!status === google.maps.GeocoderStatus.OK) {
        window.alert("Geocoder failed due to: " + status);
      };
      if(event.target.id === "city-btn") {
        callback(this.listCities(results));
      } else {
        callback(results[0].geometry.location.toJSON());
      }
    }.bind(this));
  };
  this.listCities = function(results) {
    var cities = _.map(results, function(result) {
      return result.formatted_address;
    });
    return cities;
  };
};

module.exports = CityGeocoder;