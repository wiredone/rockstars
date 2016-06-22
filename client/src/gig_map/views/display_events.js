var DisplayEvents = function(dt) {
  this.dt = dt;

  this.render = function(venues) {
    var div = document.getElementById("scroll");

    for(var venue of venues) {
      var venueName = venue.name;
      for(var gig of venue.events) {
        var ul = document.createElement("ul");
        div.appendChild(ul);
        ul.appendChild(this.createLi("Artist: ", gig.artist));
        ul.appendChild(this.createLi("Date: ", this.dt.formatDate(gig.startDate)));
        ul.appendChild(this.createLi("Time: ", this.dt.formatTime(gig.startTime)));
        ul.appendChild(this.createLi("Venue: ", venueName));
        ul.appendChild(this.createBtn());
      };
    };
  };

  this.
  for(var venue of venues) {
    var venueHTML = venue.name;
    for(var gig of venue.events) {
      venueHTML = venueHTML + "<br>" + gig.artist + "<br>" + dt.formatDate(gig.startDate) + "<br>" + dt.formatTime(gig.startTime) + "<br><a href='/orders/new'><button type='button'>Buy Tickets</button><br></a>";
    };

  this.createLi = function (header, content) {
    var li = document.createElement("li");
    li.setAttribute("class", "event-li");
    li.innerHTML = "<em><b>" + header + "</em></b>" + content;
    return li;
  };

  this.createBtn = function() {
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "tkt-btn");
    btn.innerText = "Buy Tickets";

    var a = document.createElement("a");
    a.setAttribute("href", "/orders/new");
    a.appendChild(btn);

    return a;
  };

};

module.exports = DisplayEvents;
