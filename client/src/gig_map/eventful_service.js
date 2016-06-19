var _ = require('lodash');

var ApiService = function() {

  this.url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=evSfYBzBfoEQwQq13yf0I0Po7YGf2W&";
  this.radius = "&radius=2&unit=miles";
  this.latLong = {lat: 0, long: 0};
  this.genre = "";
  this.startDate = new Date();
  this.endDate = new Date();


  this.setLatLng = function(lat, long) {
    var latString = _.toString(lat);
    var longString = _.toString(long);
    var latLongString = latString + "," + longString;
    this.url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=evSfYBzBfoEQwQq13yf0I0Po7YGf2W&latlong=" + latLongString + this.radius;

    return this.url;
  };


  this.setGenre = function(genre) {
    var genreString = _.toString(genre);
    this.url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=evSfYBzBfoEQwQq13yf0I0Po7YGf2W&classificationName=" + genreString;

    return this.url
  };


  this.setDates = function(startDate, endDate) {
    var startDateString = _.toString(startDate) + "T00:00:00Z";
    var endDateString = _.toString(endDate) + "T00:00:00Z";
    this.url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=evSfYBzBfoEQwQq13yf0I0Po7YGf2W&startDateTime=" + startDateString + "&endDateTime=" + endDateString;

    return this.url
  };
  

  this.getEvents = function(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function() {
      if( request.status === 200 ) {
        console.log( "Data retrieved" );
        var jsonString = request.responseText;
        console.log(jsonString);
        var returnedData = JSON.parse(jsonString);

        callback(returnedData);
      };
    };
    request.send(null);
  };

  this.getEventInformation(eventId) {

  };

};

module.exports = ApiService;