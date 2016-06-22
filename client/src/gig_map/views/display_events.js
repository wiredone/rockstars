var _ = require('lodash');

var DisplayEvents = function(dt, map) {
  this.dt = dt;
  this.map = map;

  this.createInfoWindow = function(venues) {
    var venueHTML = "";
    for(var venue of venues) {
      for(var gig of venue.events) {
        var venueHTML = venueHTML + "<br>" + gig.artist + "<br>" + dt.formatDate(gig.startDate) + "<br>" + dt.formatTime(gig.startTime) + "<br>" + this.createBtnString() + "<br>";
      };
      this.map.addInfoWindow(venue.latLng, venue.name, venueHTML);
    };
  };

  this.createEventList = function(venues) {
    var div = document.getElementById("scroll");
    var ul = document.createElement("ul");
    for(var venue of venues) {
      var venueName = venue.name;
      for(var gig of venue.events) {
        console.log(venue);
        console.log("gigStart", gig.startDate);
        console.log("gigEnd", gig.endDate);
        div.appendChild(ul);
        ul.appendChild(this.createLi("Artist: ", gig.artist));
        ul.appendChild(this.createLi("Date: ", this.dt.formatDate(gig.startDate)));
        ul.appendChild(this.createLi("Time: ", this.dt.formatTime(gig.startTime)));
        ul.appendChild(this.createLi("Venue: ", venueName));
        ul.appendChild(this.createBtn());
      };
    };
  };

  this.createLi = function (header, content) {
    var li = document.createElement("li");
    li.setAttribute("class", "event-li");
    li.innerHTML = "<em><b>" + header + "</em></b>" + content;
    return li;
  };

  this.createBtnString = function() {
    return "<button type='button' class='tkt-btn'>Buy Tickets</button>"
  };

  this.createBtn = function() {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'tkt-btn');
    btn.innerText = 'Buy Tickets';
    return btn; 
  };

};

module.exports = DisplayEvents;