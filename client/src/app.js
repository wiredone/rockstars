var GigMap = require("./gig_map/gig_map.js");
var EventfulService = require("./gig_map/eventful_service.js");
var AccountService = require("./gig_map/account_service.js");
var OrderService = require("./gig_map/order_service.js");


var main = function() {

  coords = {lat: 55.9410457, lng: -3.2754235};
  var eService = new EventfulService(coords);
  var map = new GigMap(coords, 11);

  map.bindClick(function(coords) {
    map.resetCenter(coords);
    addVenueMarkers();
  });

};


// something like this???
  var getInfoWindowContent = function() {
    // var events = eService.getEventsByVenue(venueId); 
    // for(var i=0, i<events.length, i++) {
      // var content = do some things here
    // };
  };  

// something like this???
  var addVenueMarkers = function() {
    // var venues = eService.getVenuesByLocation(latlng, radius);
    // for(var i=0, i<venues.length, i++) {
    //   venueCoords = venues["latlng"];
    //   map.addInfoWindow(map.convertCoords(venueCoords), i+1, getInfoWindowContent());
    // };
  };


window.onload = main;