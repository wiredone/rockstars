var _ = require('lodash');

var ApiService = function() {

  this.radius = "&radius=10&unit=miles";
  this.latLong = "";
  this.genre = "";
  this.dateRange = "";


  this.setLatLng = function(coords) {
    var latString = _.toString(coords["lat"]);
    var longString = _.toString(coords["lng"]);
    this.latLong = "&latlong=" + latString + "," + longString + this.radius;
  };


  this.setGenre = function(genre) {
    var genreString = _.toString(genre)
    this.genre = "&classificationName=" + genreString;
  };


  this.setDates = function(startDate, endDate) {
    console.log(startDate);
    console.log(endDate);
    var startString = "&startDateTime=" + startDate + "T00:00:00Z&";
    var endString = "endDateTime=" + endDate + "T23:59:59Z&";
    this.dateRange = startString + endString;
  };


  this.createUrl = function() {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=evSfYBzBfoEQwQq13yf0I0Po7YGf2Wcs";
    console.log(url);
    url = url + this.genre + this.latLong + this.dateRange;
    console.log(this.genre + this.latLong + this.dateRange);
    return url;
  };


  this.getEvents = function(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", this.createUrl());
    request.onload = function() {
      if( request.status === 200 ) {
        console.log( "Data retrieved" );
        var jsonString = request.responseText;
        console.log(jsonString);
        var returnedData = JSON.parse(jsonString);
        console.log(this);
        var parsedData = this.createVenueObjects(returnedData);

        callback(parsedData);
      };
    }.bind(this);
    request.send(null);
  };


  this.createVenueObjects = function(returnedData) {
    var venueObjectArray = [];
    var venueObject = {venueId: "", name: "", latLng: {lat: "", lng: ""}, events: ""};

    var rawEvents = returnedData["_embedded"];

    var eventsArray = this.createEventObjects(rawEvents);

    for(var event of rawEvents["events"]) {
      venueObject.venueId = event["_embedded"]["venues"][0].id;
      venueObject.name = event["_embedded"]["venues"][0].name;
      venueObject.latLng.lat = event["_embedded"]["venues"][0]["location"].latitude;
      venueObject.latLng.lng = event["_embedded"]["venues"][0]["location"].longitude;
      venueObject.events = eventsArray;

      venueObjectArray.push(venueObject);
    }
    console.log(venueObjectArray);
    return venueObjectArray;
  };

  this.createEventObjects = function(rawEvents) {
    var eventObjectsArray = [];
    var eventObject = {eventId: "", venueId: "", artist: "", startDate: "", startTime: ""}

    for(var event of rawEvents["events"]) {
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