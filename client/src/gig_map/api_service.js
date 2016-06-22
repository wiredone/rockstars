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
    console.log(url);
    return url;
  };


  this.getEvents = function(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", this.createUrl());
    request.onload = function() {
      if( request.status === 200 ) {
        var jsonString = request.responseText;
        var returnedData = JSON.parse(jsonString);
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
      var venueObject = {venueId: "", name: "", address: {line1: "", city: "", postcode: ""}, latLng: {lat: "", lng: ""}, events: []};
      venueObject.venueId = event["_embedded"]["venues"][0].id;
      venueObject.name = event["_embedded"]["venues"][0].name;
      venueObject.address.line1 = event["_embedded"]["venues"][0]["address"].line1;
      venueObject.address.city = event["_embedded"]["venues"][0]["city"].name;
      venueObject.address.postcode = event["_embedded"]["venues"][0].postalCode;
      venueObject.latLng.lat = parseFloat(event["_embedded"]["venues"][0]["location"].latitude);
      venueObject.latLng.lng = parseFloat(event["_embedded"]["venues"][0]["location"].longitude);
      for(var e of eventsArray){
        if(e["venueId"] === venueObject["venueId"])
          venueObject.events.push(e);
      };

      venueObjectArray.push(venueObject);
    };
    var uniqueVenueObjectArray = _.uniqBy(venueObjectArray, "venueId");
    return uniqueVenueObjectArray;
  };

  this.createEventObjects = function(rawEvents) {
    var eventObjectsArray = [];

    if(!rawEvents) {
      window.alert("No events found");
    };

    for(var event of rawEvents["events"]) {
      var eventObject = {eventId: "", venueId: "", artist: "", startDate: "", startTime: "", ticketSaleDates: {onSaleFrom: "", onSaleUntil: ""}}
      eventObject.eventId = event.id;

      eventObject.venueId = event["_embedded"]["venues"][0].id;
      eventObject.artist = event.name;
      eventObject.startDate = event["dates"]["start"].localDate;
      eventObject.startTime = event["dates"]["start"].localTime;
      eventObject.ticketSaleDates.oneSaleFrom = event["sales"]["public"].startDateTime;
      eventObject.ticketSaleDates.oneSaleUntil = event["sales"]["public"].endDateTime;

      eventObjectsArray.push(eventObject)
    }
    return eventObjectsArray;
  };

};

module.exports = ApiService;