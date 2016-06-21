var GigMap = require("./gig_map/gig_map.js");
var ApiService = require("./gig_map/api_service.js");
var GeoLocator = require("./gig_map/geolocator.js");
var CityGeocoder = require("./gig_map/city_geocoder.js");
var GigMapperApp = require("./gig_map/app_service.js");
// var AccountService = require("./gig_map/account_service.js");
// var OrderService = require("./gig_map/order_service.js");


var main = function() {

  var coords = {lat: 40.7053111, lng: -74.258188};
  var map = new GigMap(coords, 15);
  var cityGeocoder = new CityGeocoder();
  var apiService = new ApiService();
  var app = new GigMapperApp(map, cityGeocoder, apiService);

  var handleClick = function(event) {
    if(event.srcElement.id === "search-btn") {
      app.setProperties();
    } else {
      app.setProperties(event.srcElement);
    };
    app.findCityCoords(function(coords) {
      if(coords) {
        apiService.setLatLng(coords);
        apiService.setDates(app.startDate, app.endDate);
        apiService.setGenre(app.genre);
        apiService.getEvents(function(venues) {
          for(var venue of venues) {
            map.addInfoWindow(venue.latLng, "1", "Lovely Shows");
          };
        });
      };
    });
    
  };

  document.getElementById("form").addEventListener("submit", function(event) {
      event.preventDefault();
      handleClick();
  });

  document.getElementById("search-btn").addEventListener("click", handleClick);

  document.getElementById("city-drop").addEventListener("change", function(event) {
      // app.setCity(event.srcElement);
      handleClick(event);
      
    });
};


window.onload = main;


// user searches for venues in by city, dates and venue
// clicks button
// user may have to select city from drop-down
// input is used to set properties in apiservice
// url is created to use in request to api

// map recenters on city location
// map is populated with venue markers



// coords = {lat: 55.9410457, lng: -3.2754235};
// var eService = new EventfulService(coords);
// var map = new GigMap(coords, 11);

// map.bindClick(function(coords) {
//   map.resetCenter(coords);
//   addVenueMarkers();
// });

// something like this???
  // var getInfoWindowContent = function() {
    // var events = eService.getEventsByVenue(venueId); 
    // for(var i=0, i<events.length, i++) {
      // var content = do some things here
    // };
  // };  

// something like this???
  // var addVenueMarkers = function() {
    // var venues = eService.getVenuesByLocation(latlng, radius);
    // for(var i=0, i<venues.length, i++) {
    //   venueCoords = venues["latlng"];
    //   map.addInfoWindow(map.convertCoords(venueCoords), i+1, getInfoWindowContent());
    // };
  // };


