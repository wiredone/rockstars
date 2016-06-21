var GigMap = require("./gig_map/gig_map.js");
var ApiService = require("./gig_map/api_service.js");
var GeoLocator = require("./gig_map/geolocator.js");
var CityGeocoder = require("./gig_map/city_geocoder.js");
var GigMapperApp = require("./gig_map/app_service.js");
// var AccountService = require("./gig_map/account_service.js");
// var OrderService = require("./gig_map/order_service.js");


var main = function() {

  var coords = {lat: 40.7053111, lng: -74.258188};
  var map = new GigMap(coords, 10);
  var cityGeocoder = new CityGeocoder();
  var apiService = new ApiService();
  var app = new GigMapperApp(map, cityGeocoder, apiService);


  map.bindClick(function(coords) {
    apiService.setLatLng(coords);
    apiService.setDates(app.dateToday(), app.dateToday(7));
    apiService.setGenre("rock");
    getEvents();
  });

  var getEvents = function() {
    map.removeMarkers();
    apiService.getEvents(function(venues) {
      for(var venue of venues) {
        var venueHTML = venue.name;
        for(var gig of venue.events) {
          venueHTML = venueHTML + "<br>" + gig.artist + "<br>" + gig.startDate + "<br>" + gig.startTime + "<br>";
        };
        map.addInfoWindow(venue.latLng, venue.name, venueHTML);
      };
    });
  };

  document.getElementById("city-btn").addEventListener("click", function() {
      app.setCity();
      app.findCity(event, function() {
        var citySelect = document.getElementById("city-drop");
        app.updateCity(citySelect);
      });
  });

  var cities = document.getElementById("city-drop").addEventListener("change", function(event) {
      app.updateCity(event.target);
  });

  document.getElementById("form").addEventListener("submit", function(event) {
      event.preventDefault();
      handleClick();
  });

  document.getElementById("search-btn").addEventListener("click", function(event) {
    app.setProperties();
    app.findCity(event, function(coords) {
      apiService.setLatLng(coords);
      apiService.setDates(app.startDate, app.endDate);
      apiService.setGenre(app.genre);
      getEvents();
    });
  });


};


window.onload = main;