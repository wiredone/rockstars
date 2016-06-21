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
    var startString = "&startDateTime=" + startDate + "T00:00:00Z&";
    var endString = "endDateTime=" + endDate + "T23:59:59Z&";
    this.dateRange = startString + endString;
  };


  this.createUrl = function() {
    var url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=evSfYBzBfoEQwQq13yf0I0Po7YGf2Wcs";
    url = url + this.genre + this.latLong + this.dateRange;
    return url;
  };


  this.getEvents = function(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", this.createUrl());
    request.onload = function() {
      if( request.status === 200 ) {
        console.log( "Data retrieved" );
        var jsonString = request.responseText;
        var returnedData = JSON.parse(jsonString);
        console.log(returnedData);
        var parsedData = this.createVenueObjects(returnedData);

        callback(parsedData);
      };
    }.bind(this);
    request.send(null);
  };


  this.createVenueObjects = function(returnedData) {
    var venueObjectArray = [];

    var rawEvents = returnedData["_embedded"];

    var eventsArray = this.createEventObjects(rawEvents);

    for(var event of rawEvents["events"]) {
      var venueObject = {venueId: "", name: "", latLng: {lat: "", lng: ""}, events: []};
      venueObject.venueId = event["_embedded"]["venues"][0].id;
      venueObject.name = event["_embedded"]["venues"][0].name;
      venueObject.latLng.lat = event["_embedded"]["venues"][0]["location"].latitude;
      venueObject.latLng.lng = event["_embedded"]["venues"][0]["location"].longitude;
      for(var e of eventsArray){
        if(e["venueId"] === venueObject["venueId"])
          venueObject.events.push(e);
      };

      venueObjectArray.push(venueObject);
    };
    var uniqueVenueObjectArray = _.uniqBy(venueObjectArray, "venueId");
    console.log(uniqueVenueObjectArray);
    return uniqueVenueObjectArray;
  };

  this.createEventObjects = function(rawEvents) {
    var eventObjectsArray = [];

    for(var event of rawEvents["events"]) {
      var eventObject = {eventId: "", venueId: "", artist: "", startDate: "", startTime: ""}
      eventObject.eventId = event.id;
      eventObject.venueId = event["_embedded"]["venues"][0].id;
      eventObject.artist = event.name;
      eventObject.startDate = event["dates"]["start"].localDate;
      eventObject.startTime = event["dates"]["start"].localTime;

      eventObjectsArray.push(eventObject)
    }
    console.log(eventObjectsArray);
    return eventObjectsArray;
  };

};

module.exports = ApiService;