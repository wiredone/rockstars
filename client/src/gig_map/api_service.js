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

        var parsedData = createVenueObjects(returnedData);

        callback(parsedData);
      };
    };
    request.send(null);
  };


  this.createVenueObjects = function(returnedData) {
    var venueObjectArray = [];
    var venueObject = {venueId: "", name: "", latLng: {lat: "", lng: ""}, events: ""};

    var rawEvents = returnedData["_embedded"];

    var eventsArray = createEventObjects(rawEvents);

    for(event of rawEvents) {
      venueObject.venueId = event["_embedded"]["venues"][0].id;
      venueObject.name = event["_embedded"]["venues"][0].name;
      venueObject.latLng.lat = event["_embedded"]["venues"][0]["location"].latitude;
      venueObject.latLng.lng = event["_embedded"]["venues"][0]["location"].longitude;
      venueObject.events = eventsArray;
    }
  }

  this.createEventObjects = function(rawEvents) {
    var eventObjectsArray = [];
    var eventObject = {eventId: "", venueId: "", artist: "", startDate: "", startTime: ""}

    for(event of rawEvents) {
      eventObject.eventId = event.id;
      eventObject.venueId = event["_embedded"]["venues"][0].id;
      eventObject.artist = event.artist;
      eventObject.startDate = event["dates"]["start"].localDate;
      eventObject.startTime = event["dates"]["start"].localTime;

      eventObjectsArray.push(eventObject)
    }
    return eventObjectsArray;
  };

};

module.exports = ApiService;