var _ = require('lodash');

var ApiService = function() {

  this.url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=evSfYBzBfoEQwQq13yf0I0Po7YGf2W";
  this.radius = "&radius=2&unit=miles";
  this.latLong = "";
  this.genre = "";
  this.dateRange = "";


  this.setLatLng = function(lat, long) {
    var latString = _.toString(lat);
    var longString = _.toString(long);
    this.latLong = "&latlong=" + latString + "," + longString + this.radius + "&";

    return this.latLong;
  };


  this.setGenre = function(genre) {
    var genreString = _.toString(genre)
    this.genre = "&classificationName=" + genreString;

    return this.genre;
  };


  //"2016-06-16"

  this.setDates = function(startDate, endDate) {
    var startString = "startDateTime=" + startDate + "T00:00:00Z&";
    var endString = "endDateTime=" + endDate + "T23:59:59Z&";
    this.dateRange = startString + endString

    return this.dateRange
  };

  //startDateTime=2016-08-01T00:00:00Z&
  //endDateTime=2016-08-01T23:59:59Z&


  this.createUrl = function() {

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