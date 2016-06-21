// var User = require('./user/user.js');
// var url = 'http://localhost:3000/user';
//
// var displayUser = function(user){
//
// }

var User = require("./gig_map/account_service.js");
var OrderService = require("./gig_map/order_service.js");


var main = function() {

  var coords = {lat: 40.7053111, lng: -74.258188};
  

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
