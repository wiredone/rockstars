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
  };


  this.setGenre = function(genre) {
    var genreString = _.toString(genre)
    this.genre = "&classificationName=" + genreString;
  };


  this.setDates = function(startDate, endDate) {
    var startString = "startDateTime=" + startDate + "T00:00:00Z&";
    var endString = "endDateTime=" + endDate + "T23:59:59Z&";
    this.dateRange = startString + endString
  };


  this.createUrl = function() {
    if(this.setGenre) {
      this.url = this.url + this.genre + this.latLong + this.setDates;
    } else {
      this.url = this.url + "&classificationName=music" + this.latLong + this.setDates;
    }
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

        var parsedData = createEventObject(returnedData);

        callback(parsedData);
      };
    };
    request.send(null);
  };


  this.createEventObject = function(returnedData) {
    
  };

  this.getEventInformation(eventId) {

  };

};

module.exports = ApiService;