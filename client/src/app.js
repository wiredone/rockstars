var GigMap = require("./gig_map/gig_map.js");
var User = require("./gig_map/user.js");
var ApiService = require("./gig_map/api_service.js");
var GeoLocator = require("./gig_map/geolocator.js");
var CityGeocoder = require("./gig_map/city_geocoder.js");
var GigMapperApp = require("./gig_map/gig_mapper_app.js");
var DisplayEvents = require("./gig_map/views/display_events.js");
var DateTime = require("./gig_map/date_time.js");


var main = function() {

  var coords = {lat: 39.8282172, lng: -99.139815};
  var map = new GigMap(coords, 4);
  var dt = new DateTime();
  var eventsDisplay = new DisplayEvents(dt, map);
  var cityGeocoder = new CityGeocoder();
  var locator = new GeoLocator(map);
  var apiService = new ApiService();
  var app = new GigMapperApp(map, cityGeocoder, apiService, eventsDisplay, dt);
  
  
  if(!JSON.parse(localStorage.getItem("user"))) {
    var url = window.location.href;
    var splitUrl = _.split(url, "=");
    var userId = splitUrl[1];
    var user = new User(userId);
    user.getUser(function() {
      app.getUserName();
    });
  } else {
    app.getUserName();
  };

  map.bindClick(function(coords) {
    app.setGetApi(coords);
    map.resetCenter(coords);
  });

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

  document.getElementById("search-btn").addEventListener("click", function(event) {
    app.setProperties();
    app.findCity(event, function(coords) {
      apiService.setLatLng(coords);
      apiService.setDates(app.startDate, app.endDate);
      apiService.setGenre(app.genre);
      app.getEvents();
    });
  });

  document.getElementById("geo-loc").addEventListener("click", function() {
    locator.findCoords(function(coords) {
      app.setGetApi(coords);
    });
  });
  
};

window.onload = main;