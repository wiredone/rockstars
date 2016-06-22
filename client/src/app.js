var GigMap = require("./gig_map/gig_map.js");
var ApiService = require("./gig_map/api_service.js");
var GeoLocator = require("./gig_map/geolocator.js");
var CityGeocoder = require("./gig_map/city_geocoder.js");
var GigMapperApp = require("./gig_map/app_service.js");
var DisplayEvents = require("./gig_map/views/display_events.js");
// var AccountService = require("./gig_map/account_service.js");
// var OrderService = require("./gig_map/order_service.js");


var main = function() {

  var coords = {lat: 39.8282172, lng: -99.139815};
  var map = new GigMap(coords, 4);
  var cityGeocoder = new CityGeocoder();
  var locator = new GeoLocator(map);
  var apiService = new ApiService();
  var app = new GigMapperApp(map, cityGeocoder, apiService);
  var eventsDisplay = new DisplayEvents(app);

  map.bindClick(function(coords) {
    setGet(coords);
    map.resetCenter(coords);
  });

  var setGet = function(coords) {
    apiService.setLatLng(coords);
    apiService.setDates(app.dateToday(), app.dateToday(75));
    apiService.setGenre("");
    getEvents();
  };

  var getEvents = function() {
    map.removeMarkers();
    apiService.getEvents(function(venues) {
      for(var venue of venues) {
        var venueHTML = venue.name;
        for(var gig of venue.events) {
          venueHTML = venueHTML + "<br>" + gig.artist + "<br>" + app.formatDate(gig.startDate) + "<br>" + app.formatTime(gig.startTime) + "<br><a href='/orders/new'><button type='button'>Buy Tickets</button><br></a>";
        };
        map.addInfoWindow(venue.latLng, venue.name, venueHTML);
      };
      eventsDisplay.render(venues);
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

  document.getElementById("search-btn").addEventListener("click", function(event) {
    app.setProperties();
    app.findCity(event, function(coords) {
      apiService.setLatLng(coords);
      apiService.setDates(app.startDate, app.endDate);
      apiService.setGenre(app.genre);
      getEvents();
    });
  });

  document.getElementById("geo-loc").addEventListener("click", function() {
    locator.findCoords(function(coords) {
      setGet(coords);
    });
<<<<<<< HEAD






  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal 
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }





=======
  });
>>>>>>> develop


};


window.onload = main;